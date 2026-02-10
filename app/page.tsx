"use client";

import React, { useState } from "react";

import MainLoginForm from "@/components/MainPage/Main_Login_Form";
import MainPage from "@/components/MainPage/Main_Page";
import Choose_Hand_Face from "@/components/MainPage/Choose_Hand_Face";
import HandAnalysis from "@/components/HandAnalysis/HandAnalysis";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import PalmAnalysisResult from "@/components/PalmAnalysisResultFile/PalmAnalysisResult"; // ✅ 1. 추가

// 1. 손금 선 하나에 대한 타입
interface PalmLine {
  name: string;
  label: string;
  color: [number, number, number];
  points: [number, number][];
}

// 2. 전체 분석 결과 데이터 타입
interface AnalysisResultData {
  lines: PalmLine[];
  mounts: { [key: string]: [number, number] };
  report: string;
  image_size: {
    width: number;
    height: number;
  };
}
// ✅ 2. RESULT 씬 추가
type SceneType = "LOGIN" | "INFO" | "CHOOSE" | "HAND_ANALYSIS" | "LOADING" | "RESULT";

export default function Home() {
  const [scene, setScene] = useState<SceneType>("LOGIN");
  const [userName, setUserName] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [userCapturedImage, setUserCapturedImage] = useState<string>(""); // ✅ 4. 찍은 사진 저장

  const handleBack = () => {
    if (scene === "INFO") setScene("LOGIN");
    else if (scene === "CHOOSE") setScene("INFO");
    else if (scene === "HAND_ANALYSIS") setScene("CHOOSE");
    else if (scene === "RESULT") setScene("HAND_ANALYSIS"); // 결과에서 뒤로가면 다시 촬영
  };

  const startAIAnalysis = async (imageData: string) => {
    setScene("LOADING");
    setUserCapturedImage(imageData); // 시각화를 위해 촬영한 원본 이미지 저장

    try {
      // 1. Base64 이미지를 서버가 이해할 수 있는 Blob/File 객체로 변환
      const res = await fetch(imageData);
      const blob = await res.blob();

      const formData = new FormData();
      // 백엔드의 analyze(file: UploadFile) 매개변수 이름인 'file'과 일치해야 합니다.
      formData.append("file", blob, "hand_capture.png");

      // 2. 백엔드 서버(8000포트)로 데이터 전송
      const response = await fetch("https://werner-predomestic-lise.ngrok-free.dev/hand/analyze", {
        method: "POST",
        headers: {
          // ngrok 검사 페이지를 건너뛰기 위한 헤더 (선택사항이지만 추천)
          "ngrok-skip-browser-warning": "69420"
        },
        body: formData,
        // FormData를 보낼 때는 브라우저가 자동으로 Boundary를 설정하므로 
        // Headers에 Content-Type을 수동으로 넣지 않는 것이 정석입니다.
      });

      if (!response.ok) {
        throw new Error(`서버 응답 에러: ${response.status}`);
      }

      const result = await response.json();

      // 3. 서버 응답 결과에 따라 화면 전환
      if (result.status === "success" && result.data) {
        // ✅ [핵심] 서버에서 온 데이터를 정의한 인터페이스 타입으로 강제 지정하여 any 제거
        const analyzedData = result.data as AnalysisResultData;

        setAnalysisResult(analyzedData);
        setScene("RESULT"); // 분석 결과 화면으로 이동
      } else {
        alert(result.message || "손금을 인식하지 못했습니다. 다시 선명하게 찍어주세요.");
        setScene("HAND_ANALYSIS");
      }
    } catch (error) {
      console.error("분석 중 오류 발생:", error);
      alert("백엔드 서버와 통신할 수 없습니다. 서버가 켜져 있는지 확인해주세요.");
      setScene("HAND_ANALYSIS"); // 에러 시 촬영 화면으로 복귀
    }
  };

  return (
    <main className="flex h-[100dvh] flex-col items-center px-8 text-white bg-[#1D1D33] overflow-hidden">

      {/* 1. [상단 타이틀 영역] - RESULT 씬일 때는 디자인상 숨기거나 조정 가능 */}
      {scene !== "RESULT" && (
        <div className="w-full text-center mt-[70px] flex-none relative">
          {scene !== "LOGIN" && (
            <button onClick={handleBack} className="absolute left-0 top-0 flex items-center text-[#E2C37B]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="ml-1 text-sm font-medium">뒤로</span>
            </button>
          )}
          <p className="text-sm text-[#E2C37B] tracking-widest uppercase">당신의 운명을 읽어드립니다</p>
          <h1 className="text-2xl font-bold text-[#E2C37B] mt-[13px]">당신의 운명은 어떠한가요</h1>
          <div className="w-full h-[1px] bg-purple-500/20 mt-[16px]" />
        </div>
      )}

      {/* 2. [중간 영역] */}
      <div className="flex flex-col items-center w-full flex-1 justify-center min-h-0 overflow-y-auto w-full">
        {scene === "LOGIN" && <MainLoginForm onNext={() => setScene("INFO")} />}

        {scene === "INFO" && (
          <MainPage
            onNext={() => setScene("CHOOSE")}
            userName={userName}
            setUserName={setUserName}
          />
        )}

        {scene === "CHOOSE" && (
          <Choose_Hand_Face
            onHandNext={() => setScene("HAND_ANALYSIS")}
            onNext={() => setScene("HAND_ANALYSIS")}
          />
        )}

        {scene === "HAND_ANALYSIS" && (
          <HandAnalysis
            onBack={handleBack}
            onStartAnalysis={(image) => startAIAnalysis(image)}
          />
        )}

        {scene === "LOADING" && (
          <div className="absolute inset-0 z-50 bg-[#1D1D33] flex items-center justify-center">
            <LoadingPage userName={userName} />
          </div>
        )}

        {/* ✅ 8. 결과 페이지 씬 추가 */}
        {scene === "RESULT" && analysisResult && (
          <div className="w-full h-full overflow-y-auto">
            <PalmAnalysisResult
              data={analysisResult}
              imageUrl={userCapturedImage}
            />
          </div>
        )}
      </div>

      {/* 3. [하단 카피라이트] */}
      {scene !== "RESULT" && (
        <div className="w-full max-w-sm text-center mb-10 flex-none">
          <div className="w-full h-[1px] bg-purple-500/20 mb-6" />
          <p className="text-xs text-gray-600">© 2026 Oriental Physiognomy. All rights reserved.</p>
        </div>
      )}
    </main>
  );
}