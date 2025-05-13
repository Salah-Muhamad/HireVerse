// import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { io } from "socket.io-client";

// const socket = io("https://moose-polite-hookworm.ngrok-free.app", {
//   transports: ["websocket"], // Force WebSocket
// });
// function InterviewTest() {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const intervalRef = useRef(null);

//   const [isCapturing, setIsCapturing] = useState(false);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [videoUrl, setVideoUrl] = useState(null);

//   const interviewId = 5555;
//   const fps = 10;

//   const startCapture = async () => {
//     socket.emit("interview-started", { interview_id: interviewId });

//     setIsCapturing(true);
//     setIsWebcamOn(true);

//     // انتظر شوية لحد ما <Webcam /> يترندر
//     setTimeout(() => {
//       const webcam = webcamRef.current;
//       if (webcam && webcam.stream) {
//         const stream = webcam.stream;

//         mediaRecorderRef.current = new MediaRecorder(stream, {
//           mimeType: "video/webm",
//         });

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             setRecordedChunks((prev) => [...prev, event.data]);
//           }
//         };

//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(recordedChunks, { type: "video/webm" });
//           const url = URL.createObjectURL(blob);
//           setVideoUrl(url);
//         };

//         mediaRecorderRef.current.start();

//         intervalRef.current = setInterval(() => {
//           const imageSrc = webcam.getScreenshot();
//           if (imageSrc) {
//             fetch(imageSrc)
//               .then((res) => res.blob())
//               .then((blob) => blob.arrayBuffer())
//               .then((buffer) =>
//                 socket.emit("frame-captured", {
//                   binary_image: buffer,
//                   interview_id: interviewId,
//                 })
//               );
//           }
//         }, 1000 / fps);
//       } else {
//         console.error("Webcam stream not available.");
//       }
//     }, 500); // مهلة قصيرة 0.5 ثانية كفاية عادة
//   };

//   const stopCapture = () => {
//     socket.emit("interview-ended", { interview_id: interviewId });

//     setIsCapturing(false);
//     setIsWebcamOn(false);

//     if (intervalRef.current) clearInterval(intervalRef.current);

//     if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
//   };

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Hier Soft Test</h1>

//       {isWebcamOn && (
//         <Webcam
//           audio={true}
//           ref={webcamRef}
//           mirrored={true}
//           screenshotFormat="image/jpeg"
//           className="w-full max-w-4xl h-auto rounded-lg shadow-lg mb-6"
//         />
//       )}

//       <div className="flex space-x-4">
//         {!isCapturing && (
//           <button
//             onClick={startCapture}
//             className="px-6 py-3 rounded-lg text-white font-semibold transition-colors bg-green-500 hover:bg-green-600"
//           >
//             Start
//           </button>
//         )}
//         {isCapturing && (
//           <button
//             onClick={stopCapture}
//             className="px-6 py-3 rounded-lg text-white font-semibold transition-colors bg-red-500 hover:bg-red-600"
//           >
//             Stop
//           </button>
//         )}
//       </div>

//       {videoUrl && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Recorded Video:</h2>
//           <video
//             src={videoUrl}
//             controls
//             className="rounded-lg shadow-md max-w-xl"
//           />
//           <a
//             href={videoUrl}
//             download={`interview-${interviewId}.webm`}
//             className="mt-2 block text-blue-500 hover:underline"
//           >
//             Download Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InterviewTest;


import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { io } from 'socket.io-client';


const socket = io('https://moose-polite-hookworm.ngrok-free.app', {
    transports: ['websocket'],   // Force WebSocket
  })
// try {
//     var socket = io('wss://moose-polite-hookworm.ngrok-free.app');
// } catch (error) {
//     console.error('Error connecting to socket:', error);
//     // socket = null; // Set socket to null or handle the error as needed
// }

function InterviewTest() {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const intervalRef = useRef(null);

    const interviewId = 5555;
    
    const fps = 10;


    // start interview
    const startCapture = () => {
	    socket.emit('interview-started', {interview_id: interviewId});

        setIsCapturing(true);
        setIsWebcamOn(true);
    };


    // end interview
    const stopCapture = () => {
        socket.emit('interview-ended', {interview_id: interviewId});

        setIsCapturing(false);
        setIsWebcamOn(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        if (isCapturing && webcamRef.current) {
            intervalRef.current = setInterval(() => {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc) {
                    fetch(imageSrc)
                        .then(res => res.blob())
                        .then(blob => blob.arrayBuffer())
                        .then(buffer => socket.emit('frame-captured', {binary_image: buffer, interview_id: interviewId}));
                        // console.log(imageSrc)
                }
            }, 1000 / fps);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isCapturing]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Hier Soft Test</h1>
            {isWebcamOn && (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    className="w-full max-w-4xl h-auto rounded-lg shadow-lg mb-6"
                />
            )}
            <div className="flex space-x-4">
                {!isCapturing && (
                    <button
                        onClick={startCapture}
                        className={'px-6 py-3 rounded-lg text-white font-semibold transition-colors bg-green-500 hover:bg-green-600'}
                    >Start</button>
                )}

                {isCapturing && (
                    <button
                        onClick={stopCapture}
                        className={'px-6 py-3 rounded-lg text-white font-semibold transition-colors bg-red-500 hover:bg-red-600'}
                    >Stop</button>
                )}
            </div>
        </div>
    );
}

export default InterviewTest;


