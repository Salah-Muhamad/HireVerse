import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  // ✅ قراءة السؤال بصوت
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert("المتصفح لا يدعم القراءة الصوتية");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA"; // لو الأسئلة إنجليزي، غيّر لـ "en-US"
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  // ✅ جلب الأسئلة
  async function getQuestions() {
    try {
      let { data } = await axios.get(
        "https://hireverse.ddns.net/api/interviews/1/questions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setQuestions(data);
      console.log("📥 الأسئلة:", data);
    } catch (error) {
      console.error("❌ خطأ أثناء تحميل الأسئلة:", error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const currentQuestion = questions[currentIndex];

  // ✅ تسجيل الفيديو
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
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        await uploadAnswer(blob);
        chunksRef.current = [];
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("❌ خطأ في الوصول للكاميرا أو المايك:", error);
      alert("تأكد من صلاحيات الكاميرا والمايك.");
    }
  };

  // ✅ إيقاف التسجيل
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      const tracks = videoRef.current.srcObject?.getTracks();
      if (tracks) tracks.forEach((track) => track.stop());
    }
  };

  // ✅ رفع الفيديو
  const uploadAnswer = async (blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("applicant_answer", blob);
    formData.append("question_id", currentQuestion.id);
    formData.append("_method", "PATCH");

    try {
      const response = await axios.post(
        "https://hireverse.ddns.net/api/questions/1/answer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      console.log("✅ Response from upload:", response.data);
      moveToNextQuestion();
    } catch (err) {
      console.error("❌ Error uploading answer:", err);
      alert("حصلت مشكلة أثناء رفع الفيديو.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ الانتقال للسؤال التالي
  const moveToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("خلصت كل الأسئلة، شكرًا ليك 🎉");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Question {currentIndex + 1}</h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-lg text-gray-700 flex-1">
            {currentQuestion?.question_text ||
              currentQuestion?.question ||
              "جارٍ تحميل السؤال..."}
          </p>
          <button
            onClick={() =>
              speakText(currentQuestion?.question_text || currentQuestion?.question)
            }
            className="ml-4 text-blue-600 hover:text-blue-800 text-2xl"
            title="اسمع السؤال"
          >
            🔊
          </button>
        </div>

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
            onClick={startRecording}
            disabled={loading}
            className="bg-[#0146B1] hover:bg-[#1b4077] text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            Start Recording
          </button>

          <button
            onClick={stopRecording}
            disabled={loading || !mediaRecorder}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            Stop Recording
          </button>
        </div>

        {loading && (
          <div className="flex mt-4 justify-center">
            <BeatLoader color="#0146B1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
