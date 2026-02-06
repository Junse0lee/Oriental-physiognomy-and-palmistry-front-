"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  // 사진 촬영 및 백엔드 전송 함수
  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        await uploadImage(imageSrc);
      }
    }
  };

  const uploadImage = async (base64Image: string) => {
    setLoading(true);
    try {
      // 1. Base64 이미지를 파일 객체로 변환
      const res = await fetch(base64Image);
      const blob = await res.blob();
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

      // 2. FormData에 담기
      const formData = new FormData();
      formData.append("file", file);

      // 3. 백엔드 API 호출 (8000번 포트)
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "success") {
        // 백엔드에서 생성된 결과 이미지 URL 설정
        setResultImage(data.result_url);
      }
    } catch (error) {
      console.error("분석 실패:", error);
      alert("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 text-white">
      <h1 className="mb-8 text-4xl font-bold text-yellow-500">AI 관상 분석기</h1>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-4 border-yellow-600 bg-black shadow-2xl">
        {!resultImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full"
              mirrored={true}
            />
            <button
              onClick={capture}
              disabled={loading}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-8 py-3 font-bold text-black transition-transform hover:scale-105 active:scale-95 disabled:bg-gray-400"
            >
              {loading ? "AI 분석 중..." : "관상 보기"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center p-4">
            <img src={resultImage} alt="Analysis Result" className="w-full rounded-lg" />
            <button
              onClick={() => {setResultImage(null); setImgSrc(null);}}
              className="mt-4 rounded-lg bg-red-500 px-6 py-2 font-bold"
            >
              다시 찍기
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-slate-400 text-center">
        얼굴을 화면 중앙에 맞추고 버튼을 눌러주세요.
      </p>
    </main>
  );
}