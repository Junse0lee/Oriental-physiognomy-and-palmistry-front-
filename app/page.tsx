"use client";

import React, { useState } from "react";

import MainLoginForm from "@/components/MainPage/Main_Login_Form";
import MainPage from "@/components/MainPage/Main_Page";
import Choose_Hand_Face from "@/components/MainPage/Choose_Hand_Face";
import HandAnalysis from "@/components/HandAnalysis/HandAnalysis";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

type SceneType = "LOGIN" | "INFO" | "CHOOSE" | "HAND_ANALYSIS" | "LOADING";

export default function Home() {
  const [scene, setScene] = useState<SceneType>("LOGIN");
  const [userName, setUserName] = useState("");

  // 뒤로 가기 버튼 로직
  const handleBack = () => {
    if (scene === "INFO") setScene("LOGIN");
    else if (scene === "CHOOSE") setScene("INFO");
    else if (scene === "HAND_ANALYSIS") setScene("CHOOSE");
  };

  const startAIAnalysis = async (ImageData: string) => {
    setScene("LOADING"); //일단 로딩 화면으로 비동기식 전환

    try {
      // 실제 백엔드 주소로 데이터 전송 (예시)
      // const response = await fetch("https://your-api.com/analyze", {
      //   method: "POST",
      //   body: JSON.stringify({ image: imageData, name: userName }),
      // });
      // const data = await response.json();

      // 지금은 테스트용으로 3초 대기 후 결과창으로 넘김
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // setAnalysisResult(data); // 결과 저장
      //setScene("RESULT"); // 결과 페이지로 이동
    } catch (error) {
      console.error("분석 실패:", error);
      alert("분석 중 오류가 발생했습니다.");
      setScene("HAND_ANALYSIS"); // 실패 시 다시 촬영 페이지로
    }
  };

  return (
    <main className="flex h-[100dvh] flex-col items-center px-8 text-white bg-[#1D1D33] overflow-hidden">

      {/* 1. [고정 상단] */}
      <div className="w-full text-center mt-[70px] flex-none relative">
        {/* 뒤로가기 버튼: 좌측 상단에 배치하기 위해 절대 위치(absolute) 권장 */}
        {scene !== "LOGIN" && (
          <button
            onClick={handleBack}
            className="absolute left-0 top-0 flex items-center text-[#E2C37B] hover:opacity-70 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span className="ml-1 text-sm font-medium">뒤로</span>
          </button>
        )}

        <p className="text-sm text-[#E2C37B] tracking-widest uppercase">
          당신의 운명을 읽어드립니다
        </p>
        <h1 className="text-2xl font-bold text-[#E2C37B] mt-[13px]">
          당신의 운명은 어떠한가요
        </h1>
        <div className="w-full h-[1px] bg-purple-500/20 mt-[16px]" />
      </div>

      {/* 2. [가변 중간 영역] */}
      <div className="flex flex-col items-center w-full flex-1 justify-center min-h-0 overflow-y-auto">
        {/* scene 0: 로그인 */}
        {scene === "LOGIN" && (
          <MainLoginForm onNext={() => setScene("INFO")} />
        )}

        {/* scene 1: 정보 입력 */}
        {scene === "INFO" && (
          <MainPage onNext={() => setScene("CHOOSE")}
            userName={userName} //저장된 이름 전달
            setUserName={setUserName} //이름을 바꾸는 함수를 전달
          />)}

        {/* scene 2: 관상/손금 선택 */}
        {scene === "CHOOSE" && (
          <Choose_Hand_Face
            onNext={() => setScene("HAND_ANALYSIS")}
            onHandNext={() => setScene("HAND_ANALYSIS")}
          />
        )}

        {/* scene 3: 손금 촬영 */}
        {scene === "HAND_ANALYSIS" && (
          <HandAnalysis
            onBack={() => setScene("LOGIN")}
            onStartAnalysis={(image) => startAIAnalysis(image)}
          />
        )}

        {/* scene 4: 로딩 페이지 */}
        {scene === "LOADING" && (
          <div className="absolute inset-0 z-50 bg-[#1D1D33] flex items-center justify-center">
            <LoadingPage userName={userName} />
          </div>
        )}
      </div>


      {/* 3. [고정 하단] */}
      <div className="w-full max-w-sm text-center mb-10 flex-none">
        <div className="w-full h-[1px] bg-purple-500/20 mb-6"></div>
        <p className="text-xs text-gray-600">
          © 2026 Oriental Physiognomy. All rights reserved.
        </p>
      </div>
    </main>
  );
}