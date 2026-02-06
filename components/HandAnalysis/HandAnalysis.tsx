"use client";

import React from "react";

interface Props {
  onBack: () => void;
}

export default function HandAnalysis({ onBack }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center animate-in fade-in duration-500">
      
      {/* 1. 상단 보라색 구분선 (이미지 상단 라인) */}
      <div className="w-full h-[1px] bg-purple-500/50 mb-6" />

      {/* 2. 촬영 안내 영역 (회색 박스) */}
      <div className="w-full aspect-[3/4] bg-[#D9D9D9] rounded-lg flex items-center justify-center px-10 text-center">
        <p className="text-[#8E8E8E] text-2xl font-bold leading-relaxed">
          촬영을 위해 손바닥이 보이게<br />사진을 찍어주세요
        </p>
      </div>

      {/* 3. 하단 버튼 영역 */}
      <div className="w-full mt-auto mb-10">
        <div className="flex justify-around items-end px-4">
          
          {/* 촬영 버튼 */}
          <div className="flex flex-col items-center space-y-3">
            <button className="w-16 h-16 bg-[#E2C37B] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <span className="text-sm text-gray-300">촬영</span>
          </div>

          {/* 결과 확인 버튼 */}
          <div className="flex flex-col items-center space-y-3">
            <button className="w-16 h-16 bg-[#E2C37B] rounded-full flex flex-col items-center justify-center shadow-lg active:scale-90 transition-transform">
              <span className="text-white text-xl font-bold">?</span>
              <span className="text-white text-[10px] font-bold leading-tight">결과 확인</span>
            </button>
            <span className="text-sm text-gray-300">결과 확인</span>
          </div>
          
        </div>

        {/* 하단 보라색 구분선 및 뒤로가기 (선택사항) */}
        <div className="w-full h-[1px] bg-purple-500/50 mt-8 mb-4" />
        <button onClick={onBack} className="text-xs text-gray-500 underline w-full text-center">
          이전으로 돌아가기
        </button>
      </div>
    </div>
  );
}