import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowUpFromLine, CirclePause } from "lucide-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);
  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  // 📥 Fetch questions
  const getQuestions = async () => {
    try {
      const { data } = await axios.get(
        "https://hireverse.ddns.net/api/interviews/1/questions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setQuestions(data);
    } catch (error) {
      toast.error("Failed to load questions.");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // ⏱ Countdown on question change
  useEffect(() => {
    if (currentQuestion) {
      setCountdown(5);
      setRecordedBlob(null);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            startRecording();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestion]);

  // 🔊 Text to speech
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      toast.error("Your browser does not support speech synthesis.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  // 🎥 Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        chunksRef.current = [];

        const tracks = videoRef.current.srcObject?.getTracks();
        if (tracks) tracks.forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      toast.error("Please allow access to camera and microphone.");
    }
  };

  // 🛑 Stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  // 📤 Upload answer
  const uploadAnswer = async () => {
    if (!recordedBlob) {
      toast.error("No recording available to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("applicant_answer", recordedBlob);
    formData.append("question_id", currentQuestion.id);
    formData.append("_method", "PATCH");

    try {
      await axios.post(
        `https://hireverse.ddns.net/api/questions/${currentQuestion.id}/answer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      toast.success("Answer uploaded successfully!");
      setRecordedBlob(null);
      moveToNextQuestion();
    } catch (err) {
      toast.error("Failed to upload your answer.");
    } finally {
      setLoading(false);
    }
  };

  const moveToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      toast.success("You have completed all questions. Thank you! 🎉");
      setTimeout(() => {
        navigate("/results"); 
      }, 2000); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-[75%] bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Question {currentIndex + 1}</h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-lg text-gray-700 flex-1">
            {currentQuestion?.question_text ||
              currentQuestion?.question ||
              "Loading question..."}
          </p>
          <button
            onClick={() =>
              speakText(
                currentQuestion?.question_text || currentQuestion?.question
              )
            }
            className="ml-4 text-blue-600 hover:text-blue-800 text-2xl"
            title="Play question"
          >
            🔊
          </button>
        </div>

        {countdown > 0 && (
          <div className="flex justify-center mb-6">
            <CountdownCircleTimer
              isPlaying
              duration={5}
              colors="#0146B1"
              size={100}
              strokeWidth={8}
              onComplete={() => {
                startRecording(); // Start recording after countdown
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => (
                <div className="text-xl font-bold text-[#0146B1]">
                  {remainingTime}
                </div>
              )}
            </CountdownCircleTimer>
          </div>
        )}

        <div className="mb-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={stopRecording}
            disabled={loading || !mediaRecorder}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            <div className="flex gap-4">
              Stop Recordin
              <CirclePause />
            </div>
          </button>

          <button
            onClick={uploadAnswer}
            disabled={loading || !recordedBlob}
            className="bg-[#0146B1] text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            <div className="flex gap-4">
              Upload <ArrowUpFromLine />
            </div>
          </button>
        </div>

        {loading && (
          <div className="flex mt-4 justify-center">
            <BeatLoader color="#0146B1" />
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Interview;
