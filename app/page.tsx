"use client";

import React, { useState } from "react";

import MainLoginForm from "@/components/MainPage/Main_Login_Form";
import MainPage from "@/components/MainPage/Main_Page"; 
import Choose_Hand_Face from "@/components/MainPage/Choose_Hand_Face";
import HandAnalysis from "@/components/HandAnalysis/HandAnalysis";

export default function Home() {
  const [scene, setScene] = useState(0);

  return (
    <main className="flex h-[100dvh] flex-col items-center px-8 text-white bg-[#1D1D33] overflow-hidden">
      
      {/* 1. [고정 상단] */}
      <div className="w-full text-center mt-[70px] flex-none">
        <p className="text-sm text-[#E2C37B] tracking-widest uppercase">
          당신의 운명을 읽어드립니다
        </p>
        <h1 className="text-2xl font-bold text-[#E2C37B] mt-[13px]">
          당신의 운명은 어떠한가요
        </h1>
        <div className="w-full h-[1px] bg-purple-500/20 mt-[16px]"/>
      </div>

      {/* 2. [가변 중간 영역] */}
      <div className="flex flex-col items-center w-full flex-1 justify-center min-h-0 overflow-y-auto">
        
        {/* scene 0: 인트로 (setScence -> setScene 오타 수정) */}
        {scene === 0 && (
          <MainLoginForm onNext={() => setScene(1)}/> 
        )}
        
        {/* scene 1: 정보 입력 */}
        {scene === 1 && (
          <MainPage onNext={() => setScene(2)} />
        )}

        {/* scene 2: 관상/손금 선택 (onHandNext 추가 전달) */}
        {scene === 2 && (
          <Choose_Hand_Face
            onNext={() => setScene(4)}      
            onHandNext={() => setScene(3)}
          />  
        )}

        {/* scene 3: 손금 촬영 */}
        {scene === 3 && (
          <HandAnalysis onBack={() => setScene(0)} />
        )}
      </div>

      {/* 3. [고정 하단] */}
      <div className="w-full max-w-sm text-center mb-10 flex-none">
        <div className="w-full h-[1px] bg-purple-500/20 mb-6"></div>
        <p className="text-xs text-gray-600">© 2026 Oriental Physiognomy. All rights reserved.</p>
      </div>
    </main>
  );
}