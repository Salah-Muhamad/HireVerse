import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";

// --- Constants ---
const TARGET_FRAME_COUNT = 100;
const REF_EYE_DISTANCE_CM = 6.3; // A common average distance between eyes
const FOCAL_LENGTH_CALIBRATION_DISTANCE_CM = 60; // Assume user is about 60cm away for initial focal length calculation
const MIN_DISTANCE_CM = 50;
const MAX_DISTANCE_CM = 80;

// Gaze validation thresholds
const GAZE_CENTER_THRESHOLD = 0.15; // How close to center (0.5) the gaze should be
const GAZE_VALIDATION_FRAMES = 10; // Number of consecutive frames needed for gaze validation

// Calibration validation thresholds
const CALIBRATION_POSITION_THRESHOLD = 60; // Pixels from center for nose position
const CALIBRATION_GAZE_THRESHOLD = 0.2; // More lenient than initial positioning
const MAX_VALIDATION_FAILURES = 3; // Allow a few bad frames before failing

// --- Landmark Indices ---
const LEFT_EYE_EAR_INDICES = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE_EAR_INDICES = [362, 387, 385, 263, 380, 373];

// Eye corner landmarks for gaze calculation
const LEFT_EYE_LEFT = 33;
const LEFT_EYE_RIGHT = 133;
const LEFT_EYE_TOP = 159;
const LEFT_EYE_BOTTOM = 145;
const RIGHT_EYE_LEFT = 362;
const RIGHT_EYE_RIGHT = 263;
const RIGHT_EYE_TOP = 386;
const RIGHT_EYE_BOTTOM = 374;

// Iris center landmarks (approximate)
const LEFT_IRIS_CENTER = 468;
const RIGHT_IRIS_CENTER = 473;

// --- Helper Functions ---
const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
const getEyeCenter = (left, right, top, bottom) => ({ x: (left.x + right.x) / 2, y: (top.y + bottom.y) / 2 });

const calculateGazeRatio = (landmarks, irisIdx, leftIdx, rightIdx, topIdx, bottomIdx) => {
    try {
        const iris = landmarks[irisIdx];
        const left = landmarks[leftIdx];
        const right = landmarks[rightIdx];
        const top = landmarks[topIdx];
        const bottom = landmarks[bottomIdx];

        if (!iris || !left || !right || !top || !bottom) {
            return { h_ratio: null, v_ratio: null };
        }

        // Calculate horizontal ratio (0 = far left, 0.5 = center, 1 = far right)
        const h_ratio = (iris.x - left.x) / (right.x - left.x);
        
        // Calculate vertical ratio (0 = top, 0.5 = center, 1 = bottom)
        const v_ratio = (iris.y - top.y) / (bottom.y - top.y);

        // Validate ratios are within reasonable bounds
        if (!isFinite(h_ratio) || !isFinite(v_ratio) || 
            h_ratio < -0.5 || h_ratio > 1.5 || 
            v_ratio < -0.5 || v_ratio > 1.5) {
            return { h_ratio: null, v_ratio: null };
        }

        return { h_ratio, v_ratio };
    } catch (error) {
        return { h_ratio: null, v_ratio: null };
    }
};

const isGazeCentered = (leftGaze, rightGaze, threshold = GAZE_CENTER_THRESHOLD) => {
    if (!leftGaze || !rightGaze || 
        leftGaze.h_ratio === null || leftGaze.v_ratio === null ||
        rightGaze.h_ratio === null || rightGaze.v_ratio === null) {
        return false;
    }

    // Average the gaze ratios from both eyes
    const avgH = (leftGaze.h_ratio + rightGaze.h_ratio) / 2;
    const avgV = (leftGaze.v_ratio + rightGaze.v_ratio) / 2;

    // Check if gaze is close to center (0.5, 0.5)
    const hCentered = Math.abs(avgH - 0.5) < threshold;
    const vCentered = Math.abs(avgV - 0.5) < threshold;

    return hCentered && vCentered;
};

const validateCalibrationFrame = (keypoints, videoWidth, focalLength) => {
    const validation = {
        isValid: false,
        distanceOK: false,
        positionOK: false,
        gazeOK: false,
        distance: null,
        positionOffset: null,
        gazeDeviation: null,
        failureReason: null
    };

    if (!keypoints || keypoints.length === 0) {
        validation.failureReason = "No face detected";
        return validation;
    }

    const leftEye = keypoints[33];
    const rightEye = keypoints[133];
    const nose = keypoints[1];

    if (!leftEye || !rightEye || !nose) {
        validation.failureReason = "Missing facial landmarks";
        return validation;
    }

    // Distance validation
    const eyeDistPixels = distance(leftEye, rightEye);
    if (focalLength && eyeDistPixels > 0) {
        const estDist = (REF_EYE_DISTANCE_CM * focalLength) / eyeDistPixels;
        validation.distance = estDist;
        
        if (estDist < MIN_DISTANCE_CM) {
            validation.failureReason = "Too close to camera";
        } else if (estDist > MAX_DISTANCE_CM) {
            validation.failureReason = "Too far from camera";
        } else {
            validation.distanceOK = true;
        }
    }

    // Position validation
    const positionOffset = Math.abs(nose.x - videoWidth / 2);
    validation.positionOffset = positionOffset;
    
    if (positionOffset > CALIBRATION_POSITION_THRESHOLD) {
        validation.failureReason = validation.failureReason || "Not centered in frame";
    } else {
        validation.positionOK = true;
    }

    // Gaze validation
    if (keypoints.length > Math.max(LEFT_IRIS_CENTER, RIGHT_IRIS_CENTER)) {
        const leftGaze = calculateGazeRatio(
            keypoints, LEFT_IRIS_CENTER, 
            LEFT_EYE_LEFT, LEFT_EYE_RIGHT, LEFT_EYE_TOP, LEFT_EYE_BOTTOM
        );
        const rightGaze = calculateGazeRatio(
            keypoints, RIGHT_IRIS_CENTER,
            RIGHT_EYE_LEFT, RIGHT_EYE_RIGHT, RIGHT_EYE_TOP, RIGHT_EYE_BOTTOM
        );

        if (isGazeCentered(leftGaze, rightGaze, CALIBRATION_GAZE_THRESHOLD)) {
            validation.gazeOK = true;
        } else {
            // Calculate gaze deviation for feedback
            if (leftGaze.h_ratio !== null && rightGaze.h_ratio !== null &&
                leftGaze.v_ratio !== null && rightGaze.v_ratio !== null) {
                const avgH = (leftGaze.h_ratio + rightGaze.h_ratio) / 2;
                const avgV = (leftGaze.v_ratio + rightGaze.v_ratio) / 2;
                validation.gazeDeviation = {
                    horizontal: Math.abs(avgH - 0.5),
                    vertical: Math.abs(avgV - 0.5)
                };
            }
            validation.failureReason = validation.failureReason || "Not looking at center dot";
        }
    } else {
        validation.failureReason = validation.failureReason || "Cannot detect gaze";
    }

    validation.isValid = validation.distanceOK && validation.positionOK && validation.gazeOK;
    return validation;
};

const Calibration = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const modelRef = useRef(null);
    const intervalRef = useRef(null);
    const focalLengthRef = useRef(null);
    const calibrationDataRef = useRef([]);
    const gazeValidationCountRef = useRef(0);
    const validationFailuresRef = useRef(0);

    // --- Component States ---
    const [status, setStatus] = useState("LOADING_MODELS");
    const [positionFeedback, setPositionFeedback] = useState({ 
        distText: 'Detecting...', 
        posText: '', 
        gazeText: '',
        distColor: 'white', 
        posColor: 'white',
        gazeColor: 'white'
    });
    const [isPositionOK, setIsPositionOK] = useState(false);
    const [calibrationError, setCalibrationError] = useState(null);

    // --- Drawing Helper ---
    const drawCanvas = (feedback = {}) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        // Draw centering line only during positioning
        if (status === 'POSITIONING') {
            ctx.strokeStyle = feedback.posColor === 'lime' ? 'lime' : 'red';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.stroke();
        }

        // Draw red dot for focus
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();

        // Draw text feedback
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        if (feedback.distText) {
            ctx.fillStyle = feedback.distColor || "white";
            ctx.fillText(feedback.distText, 10, 30);
        }
        if (feedback.posText) {
            ctx.fillStyle = feedback.posColor || "white";
            ctx.fillText(feedback.posText, 10, 60);
        }
        if (feedback.gazeText) {
            ctx.fillStyle = feedback.gazeColor || "white";
            ctx.fillText(feedback.gazeText, 10, 90);
        }
        if (feedback.progressText) {
            ctx.textAlign = "center";
            ctx.fillStyle = "lime";
            ctx.font = "22px Arial";
            ctx.fillText(feedback.progressText, width / 2, height - 50);
        }
        if (feedback.warningText) {
            ctx.textAlign = "center";
            ctx.fillStyle = "orange";
            ctx.font = "18px Arial";
            ctx.fillText(feedback.warningText, width / 2, height - 80);
        }
    };

    // --- Main Logic ---
    useEffect(() => {
        const loadResources = async () => {
            setStatus("LOADING_MODELS");
            try {
                await tf.setBackend('webgl');
                const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
                const detector = await faceLandmarksDetection.createDetector(model, {
                    runtime: 'tfjs',
                    maxFaces: 1,
                    refineLandmarks: true, // Important for iris detection
                    modelConfig: { minDetectionConfidence: 0.3 },
                });
                modelRef.current = detector;
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => setStatus("POSITIONING");
                }
            } catch (err) {
                console.error("Error loading resources:", err);
                setStatus("ERROR");
            }
        };
        loadResources();
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        clearInterval(intervalRef.current);

        if (status === 'POSITIONING') {
            gazeValidationCountRef.current = 0;
            validationFailuresRef.current = 0;
            setCalibrationError(null);
            intervalRef.current = setInterval(runPositioningCheck, 200);
        } else if (status === 'CALIBRATING') {
            calibrationDataRef.current = [];
            validationFailuresRef.current = 0;
            intervalRef.current = setInterval(runCalibration, 100);
        } else if (status === 'READY') {
            drawCanvas(); // Draw dot while waiting
        } else if (status === 'PROCESSING_RESULTS') {
            processResults();
        } else if (status === 'CALIBRATION_FAILED') {
            // Reset for retry
            setTimeout(() => {
                setStatus('POSITIONING');
            }, 3000);
        }

        return () => clearInterval(intervalRef.current);
    }, [status]);

    const runPositioningCheck = async () => {
        if (!modelRef.current || !videoRef.current || videoRef.current.readyState < 2) return;
        const video = videoRef.current;
        const predictions = await modelRef.current.estimateFaces(video);
        let feedback = {};
        let positionCorrect = false;

        if (predictions.length > 0) {
            const keypoints = predictions[0].keypoints;
            const leftEye = keypoints[33], rightEye = keypoints[133], nose = keypoints[1];
            
            // Distance validation
            const eyeDistPixels = distance(leftEye, rightEye);
            if (focalLengthRef.current === null && eyeDistPixels > 0) {
                focalLengthRef.current = (eyeDistPixels * FOCAL_LENGTH_CALIBRATION_DISTANCE_CM) / REF_EYE_DISTANCE_CM;
            }
            let distOK = false;
            if (focalLengthRef.current && eyeDistPixels > 0) {
                const estDist = (REF_EYE_DISTANCE_CM * focalLengthRef.current) / eyeDistPixels;
                feedback.distText = `Distance: ${estDist.toFixed(1)} cm`;
                if (estDist < MIN_DISTANCE_CM) {
                    feedback.distColor = "orange";
                } else if (estDist > MAX_DISTANCE_CM) {
                    feedback.distColor = "orange";
                } else {
                    feedback.distColor = "lime";
                    distOK = true;
                }
            } else {
                feedback.distText = "Detecting Distance...";
            }

            // Center position validation
            let centerOK = Math.abs(nose.x - video.width / 2) < 50;
            feedback.posText = centerOK ? "Position: Centered" : "Position: Off-Center";
            feedback.posColor = centerOK ? "lime" : "orange";
            
            // Gaze validation
            let gazeOK = false;
            if (keypoints.length > Math.max(LEFT_IRIS_CENTER, RIGHT_IRIS_CENTER)) {
                const leftGaze = calculateGazeRatio(
                    keypoints, LEFT_IRIS_CENTER, 
                    LEFT_EYE_LEFT, LEFT_EYE_RIGHT, LEFT_EYE_TOP, LEFT_EYE_BOTTOM
                );
                const rightGaze = calculateGazeRatio(
                    keypoints, RIGHT_IRIS_CENTER,
                    RIGHT_EYE_LEFT, RIGHT_EYE_RIGHT, RIGHT_EYE_TOP, RIGHT_EYE_BOTTOM
                );

                if (isGazeCentered(leftGaze, rightGaze)) {
                    gazeValidationCountRef.current++;
                    if (gazeValidationCountRef.current >= GAZE_VALIDATION_FRAMES) {
                        gazeOK = true;
                        feedback.gazeText = "Gaze: Centered on dot";
                        feedback.gazeColor = "lime";
                    } else {
                        feedback.gazeText = `Gaze: Centering... ${gazeValidationCountRef.current}/${GAZE_VALIDATION_FRAMES}`;
                        feedback.gazeColor = "yellow";
                    }
                } else {
                    gazeValidationCountRef.current = 0;
                    feedback.gazeText = "Gaze: Look at red dot";
                    feedback.gazeColor = "orange";
                }
            } else {
                feedback.gazeText = "Gaze: Detecting...";
                feedback.gazeColor = "white";
            }
            
            positionCorrect = distOK && centerOK && gazeOK;
        } else {
            feedback.distText = "No face detected";
            feedback.posText = "";
            feedback.gazeText = "";
            gazeValidationCountRef.current = 0;
        }
        
        setIsPositionOK(positionCorrect);
        drawCanvas(feedback);
    };

    const runCalibration = async () => {
        const currentCount = calibrationDataRef.current.length;
        if (currentCount >= TARGET_FRAME_COUNT) {
            setStatus('PROCESSING_RESULTS');
            return;
        }

        if (!modelRef.current || !videoRef.current || videoRef.current.readyState < 2) return;

        const predictions = await modelRef.current.estimateFaces(videoRef.current);
        
        // Validate current frame
        let validation = { isValid: false, failureReason: "No face detected" };
        if (predictions.length > 0) {
            const keypoints = predictions[0].keypoints;
            validation = validateCalibrationFrame(keypoints, videoRef.current.width, focalLengthRef.current);
        }

        // Handle validation failures
        if (!validation.isValid) {
            validationFailuresRef.current++;
            
            const progressText = `Collected ${currentCount} / ${TARGET_FRAME_COUNT} frames`;
            const warningText = `Issue: ${validation.failureReason} (${validationFailuresRef.current}/${MAX_VALIDATION_FAILURES})`;
            
            drawCanvas({ 
                progressText, 
                warningText 
            });

            if (validationFailuresRef.current >= MAX_VALIDATION_FAILURES) {
                setCalibrationError(validation.failureReason);
                toast.error(`Calibration failed: ${validation.failureReason}`);
                setStatus('CALIBRATION_FAILED');
                return;
            }
            return; // Don't collect this frame
        } else {
            // Reset failure counter on successful validation
            validationFailuresRef.current = 0;
        }

        // Frame is valid, show progress
        drawCanvas({ progressText: `Collected ${currentCount + 1} / ${TARGET_FRAME_COUNT} frames` });

        // Process valid frame
        const keypoints = predictions[0].keypoints;
        const leftEar = calculateEAR(keypoints, LEFT_EYE_EAR_INDICES);
        const rightEar = calculateEAR(keypoints, RIGHT_EYE_EAR_INDICES);
        
        // Calculate gaze ratios for calibration
        const leftGaze = calculateGazeRatio(
            keypoints, LEFT_IRIS_CENTER, 
            LEFT_EYE_LEFT, LEFT_EYE_RIGHT, LEFT_EYE_TOP, LEFT_EYE_BOTTOM
        );
        const rightGaze = calculateGazeRatio(
            keypoints, RIGHT_IRIS_CENTER,
            RIGHT_EYE_LEFT, RIGHT_EYE_RIGHT, RIGHT_EYE_TOP, RIGHT_EYE_BOTTOM
        );
        
        if (leftEar && rightEar && 
            leftGaze.h_ratio !== null && leftGaze.v_ratio !== null && 
            rightGaze.h_ratio !== null && rightGaze.v_ratio !== null) {
            calibrationDataRef.current.push({ 
                leftEar, 
                rightEar, 
                left_h_ratio: leftGaze.h_ratio, 
                left_v_ratio: leftGaze.v_ratio,
                right_h_ratio: rightGaze.h_ratio,
                right_v_ratio: rightGaze.v_ratio
            });
        }
    };
    
    const processResults = () => {
        const data = calibrationDataRef.current;
        if (data.length < TARGET_FRAME_COUNT) {
            toast.error("Calibration failed. Please try again.");
            setStatus("READY");
            return;
        }

        // Calculate averages for all measurements
        const avg_ear = data.reduce((s, d) => s + (d.leftEar + d.rightEar) / 2, 0) / data.length;
        const left_ear = data.reduce((s, d) => s + d.leftEar, 0) / data.length;
        const right_ear = data.reduce((s, d) => s + d.rightEar, 0) / data.length;
        
        const avg_h_ratio = data.reduce((s, d) => s + (d.left_h_ratio + d.right_h_ratio) / 2, 0) / data.length;
        const left_h_ratio = data.reduce((s, d) => s + d.left_h_ratio, 0) / data.length;
        const right_h_ratio = data.reduce((s, d) => s + d.right_h_ratio, 0) / data.length;
        
        const avg_v_ratio = data.reduce((s, d) => s + (d.left_v_ratio + d.right_v_ratio) / 2, 0) / data.length;
        const left_v_ratio = data.reduce((s, d) => s + d.left_v_ratio, 0) / data.length;
        const right_v_ratio = data.reduce((s, d) => s + d.right_v_ratio, 0) / data.length;
        
        const calibratedResults = { 
            threshold:
                {
                    avg_ear, 
                    left_ear, 
                    right_ear,
                    avg_h_ratio, 
                    left_h_ratio, 
                    right_h_ratio,
                    avg_v_ratio, 
                    left_v_ratio, 
                    right_v_ratio
                },
                interview_id: 1
        };
        
        // Save calibration results to JSON file
        saveCalibrationResults(calibratedResults);
        
        toast.success("Calibration Complete!");
        setStatus("DONE");
        
        // Navigate to interview after a short delay
        setTimeout(() => {
            navigate('/interview');
        }, 2000);
    };

    const saveCalibrationResults = async (data, filename = 'calibration_results.json') => {
        try {
            const response = await fetch('/save-calibration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, data }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
            } else {
                console.error('Failed to save file on the server.');
            }
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };

    const renderContent = () => {
        switch (status) {
            case 'LOADING_MODELS': 
                return <p className="text-gray-600">Loading face detection models...</p>;
            case 'POSITIONING':
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Adjust Your Position</h2>
                        <p className="text-gray-600">Please position yourself correctly and look directly at the red dot before calibration.</p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>✓ Keep proper distance (50-80cm)</p>
                            <p>✓ Center yourself with the vertical line</p>
                            <p>✓ Look directly at the red dot in the center</p>
                        </div>
                        {calibrationError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm">Previous calibration failed: {calibrationError}</p>
                                <p className="text-red-600 text-xs mt-1">Please ensure you maintain proper position throughout the calibration.</p>
                            </div>
                        )}
                        <button 
                            disabled={!isPositionOK} 
                            onClick={() => setStatus("READY")} 
                            className={`w-full px-6 py-3 rounded-lg transition-colors text-white font-medium ${
                                isPositionOK ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isPositionOK ? "All Checks Passed!" : "Adjusting Position..."}
                        </button>
                    </div>
                );
            case 'READY':
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Ready to Calibrate</h2>
                        <p className="text-gray-600">Keep looking at the red dot throughout the calibration process.</p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-yellow-800 text-sm font-medium">Important:</p>
                            <ul className="text-yellow-700 text-xs mt-1 space-y-1">
                                <li>• Stay centered in the frame</li>
                                <li>• Maintain your distance from the camera</li>
                                <li>• Keep looking at the red dot</li>
                                <li>• Calibration will fail if you move too much</li>
                            </ul>
                        </div>
                        <button 
                            onClick={() => setStatus('CALIBRATING')} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        >
                            Start Calibration
                        </button>
                    </div>
                );
            case 'CALIBRATING': 
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Calibrating...</h2>
                        <p className="text-gray-600">Please keep looking at the red dot and stay still.</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">Calibration is monitoring your position continuously.</p>
                            <p className="text-blue-600 text-xs mt-1">If you move too much, calibration will restart.</p>
                        </div>
                    </div>
                );
            case 'CALIBRATION_FAILED':
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-red-600">Calibration Failed</h2>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 font-medium">Reason: {calibrationError}</p>
                            <p className="text-red-600 text-sm mt-2">
                                The calibration process requires you to maintain proper positioning throughout. 
                                Please ensure you:
                            </p>
                            <ul className="text-red-600 text-sm mt-2 space-y-1">
                                <li>• Stay between 50-80cm from the camera</li>
                                <li>• Keep your face centered in the frame</li>
                                <li>• Look directly at the red dot at all times</li>
                                <li>• Avoid moving during calibration</li>
                            </ul>
                        </div>
                        <p className="text-gray-600 text-center">Returning to position adjustment...</p>
                        <div className="flex justify-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        </div>
                    </div>
                );
            case 'PROCESSING_RESULTS': 
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Processing Results...</h2>
                        <p className="text-gray-600">Calculating calibration parameters...</p>
                    </div>
                );
            case 'DONE': 
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-green-600">Calibration Complete!</h2>
                        <p className="text-gray-600">Results have been saved. Redirecting to interview...</p>
                        <div className="flex justify-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    </div>
                );
            case 'ERROR': 
                return (
                    <div className="space-y-4">
                        <p className="text-red-500">Error loading calibration system.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Refresh Page
                        </button>
                    </div>
                );
            default: 
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
            <ToastContainer position="bottom-right"/>
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-white p-6 text-center border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Eye Tracking Calibration</h1>
                </div>
                
                {/* Video Section */}
                <div className="p-6">
                    <div className="relative w-full max-w-2xl mx-auto mb-6">
                        <div className="relative overflow-hidden rounded-lg bg-black">
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                muted 
                                playsInline 
                                className="w-full h-auto block" 
                                style={{ transform: 'scaleX(-1)' }} 
                                width="640" 
                                height="480" 
                            />
                            <canvas 
                                ref={canvasRef} 
                                width="640" 
                                height="480" 
                                className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                            />
                        </div>
                    </div>
                </div>
                
                {/* Instructions and Controls */}
                <div className="p-6 pt-0">
                    <div className="max-w-md mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const calculateEAR = (landmarks, indices) => {
    try {
        const points = indices.map(i => landmarks[i]);
        if (points.some(p => !p)) return null;
        const [p1, p2, p3, p4, p5, p6] = points;
        const vertical_dist1 = distance(p2, p6);
        const vertical_dist2 = distance(p3, p5);
        const horizontal_dist = distance(p1, p4);
        if (horizontal_dist === 0) return null;
        return (vertical_dist1 + vertical_dist2) / (2.0 * horizontal_dist);
    } catch { 
        return null; 
    }
};

export default Calibration;