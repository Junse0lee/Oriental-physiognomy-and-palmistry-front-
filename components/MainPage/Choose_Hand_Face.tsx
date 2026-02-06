"use client";

import React from "react";

// 1. Interface에 onHandNext를 추가하여 TypeScript에게 알려줍니다.
interface Props {
  onNext: () => void;     // 관상용
  onHandNext: () => void; // 손금용
}

// 2. 함수 인자(Destructuring)에도 onHandNext를 추가합니다.
export default function Choose_Hand_Face({ onNext, onHandNext }: Props) {
  return (
    <div className="w-full flex flex-col items-center space-y-8 animate-in fade-in duration-700">
      
      {/* 1. 상단 아이콘 영역 */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-4 opacity-80">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20C30 20 10 40 10 50C10 60 30 80 50 80C70 80 90 60 90 50C90 40 70 20 50 20ZM50 70C38.95 70 30 61.05 30 50C30 38.95 38.95 30 50 30C61.05 30 70 38.95 70 50C70 61.05 61.05 70 50 70Z" fill="#E2C37B"/>
            <circle cx="50" cy="50" r="10" fill="#E2C37B"/>
          </svg>
        </div>
        <p className="text-[#E2C37B] text-lg font-medium tracking-tight">
          당신의 운명을 읽어드립니다
        </p>
      </div>

      {/* 2. 카드 버튼 영역 (천부적 관상) */}
      <button 
        onClick={onNext}
        className="w-full max-w-sm bg-[#25253D]/50 border border-white/5 p-6 rounded-[30px] flex items-center space-x-6 hover:bg-[#25253D] transition-all group active:scale-95"
      >
        <div className="w-24 h-24 flex-none grayscale group-hover:grayscale-0 transition-all">
          <span className="text-5xl">👤</span>
        </div>
        <div className="text-left">
          <h3 className="text-[#E2C37B] text-xl font-bold mb-1">천부적 관상</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            당신의 얼굴에 새겨진<br/>하늘의 뜻은?
          </p>
        </div>
      </button>

      {/* 3. 카드 버튼 영역 (손금의 비밀) */}
      <button 
        onClick={onHandNext}  // 이제 에러 없이 작동합니다!
        className="w-full max-w-sm bg-[#25253D]/50 border border-white/5 p-6 rounded-[30px] flex items-center space-x-6 hover:bg-[#25253D] transition-all group active:scale-95"
      >
        <div className="w-24 h-24 flex-none grayscale group-hover:grayscale-0 transition-all text-5xl flex items-center justify-center">
          ✋
        </div>
        <div className="text-left">
          <h3 className="text-[#E2C37B] text-xl font-bold mb-1">손금의 비밀</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            운명의 선들이 그려내는<br/>당신의 내일
          </p>
        </div>
      </button>

      {/* 4. 하단 설명 문구 */}
      <div className="pt-8 text-center space-y-1 opacity-60">
        <p className="text-[11px] text-gray-300 font-light">
          얼굴 비율을 이용한 동양 관상학을 이용했습니다.
        </p>
        <p className="text-[11px] text-gray-300 font-light">
          손금 또한 기존 손금 보는 방식을 바탕으로 진행했습니다.
        </p>
      </div>
    </div>
  );
}