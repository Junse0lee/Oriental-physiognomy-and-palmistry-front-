"use client";

import React, { useRef, useState } from "react";

export default function Home() {


  return (
    <main className="flex flex-1 flex-col items-center justify-between py-16 px-8 text-white">
      
      {/* 1. 상단 타이틀 영역 (이미지 스타일) */}
      <div className="w-full text-center space-y-2">
        <p className="text-sm text-gray-400 tracking-widest">당신의 운명을 읽어 드립니다</p>
        <h1 className="text-2xl font-bold text-[#E2C37B] tracking-tight">당신의 운명은 어떠한가요</h1>
        <div className="w-full h-[1px] bg-purple-500/30 mt-6"></div>
      </div>

      {/* 2. 중앙 컨텐츠 영역 (카메라 또는 결과) */}
      <div className="flex flex-col items-center w-full">
        {!resultImage ? (
          <div className="relative w-full max-w-[280px] aspect-square flex flex-col items-center justify-center">
            {/* 카메라가 나오는 곳 (이미지 속 아이콘 역할을 대체) */}
            <div className="w-full rounded-full overflow-hidden border-2 border-[#E2C37B]/20 shadow-[0_0_30px_rgba(226,195,123,0.1)]">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                mirrored={true}
              />
            </div>
            
            <div className="mt-10 text-center space-y-2">
              <p className="text-xl font-medium text-[#E2C37B]">당신의 미래가 보입니다</p>
              <p className="text-lg font-medium text-[#E2C37B]">의심하지 마세요</p>
              <p className="text-xl font-bold text-[#E2C37B]">당신은 멋진 삶을 살고 있네요!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={resultImage} alt="Result" className="w-64 rounded-xl shadow-2xl border border-[#E2C37B]/30" />
            <button 
              onClick={() => setResultImage(null)}
              className="mt-8 text-gray-400 text-sm underline underline-offset-4"
            >
              다시 확인하기
            </button>
          </div>
        )}
      </div>

      {/* 3. 하단 버튼 영역 (이미지 속 금색 그라데이션 버튼) */}
      <div className="w-full space-y-6">
        <button
          onClick={capture}
          disabled={loading}
          className="w-full py-4 rounded-xl font-bold text-[#5C4D2B]
                     bg-gradient-to-b from-[#F3D68B] via-[#E2C37B] to-[#B89548]
                     shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                     active:scale-95 transition-transform
                     disabled:opacity-50"
        >
          {loading ? "운명 읽는 중..." : "운명 확인하기"}
        </button>
        <div className="w-full h-[1px] bg-purple-500/30"></div>
      </div>

    </main>
  );
}