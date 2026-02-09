"use client";

import React, { useState } from "react";

interface Props {
  onNext: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

export default function MainPage({ onNext, userName, setUserName }: Props) {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birth, setBirth] = useState("");

  return (
    /* h-full과 flex-col로 전체 높이를 제어합니다. */
    <div className="w-full h-full flex flex-col items-center">

      {/* 1. 성별 선택 영역 (상단 고정) */}
      <div className="w-full flex justify-between px-[72px] mt-[45px] flex-none">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => setGender("male")}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 transition-all
              ${gender === "male" ? "border-[#E2C37B] bg-[#E2C37B]/20" : "border-gray-600 bg-transparent"}`}
          >
            👨
          </button>
          <span className="text-sm text-gray-300">남성</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => setGender("female")}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 transition-all
              ${gender === "female" ? "border-[#E2C37B] bg-[#E2C37B]/20" : "border-gray-600 bg-transparent"}`}
          >
            👩
          </button>
          <span className="text-sm text-gray-300">여성</span>
        </div>
      </div>

      {/* 2. 입력 영역 (타자판을 부르는 주범!) */}
      <div className="mt-[71px] w-full px-[72px] flex flex-col items-center flex-none">
        <div className="flex items-center space-x-4 w-full">
          <label className="text-[#E2C37B] font-medium shrink-0 w-20">이름 :</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // 부모의 상태를 바꿈
            placeholder="이름 입력"
            className="w-full bg-transparent border-b border-[#E2C37B] py-1 outline-none text-white focus:border-white transition-colors"
          />
        </div>

        <div className="flex items-center space-x-4 w-full mt-[13px]">
          <label className="text-[#E2C37B] font-medium shrink-0 w-20">생년월일 :</label>
          <input
            type="text"
            inputMode="numeric" // 모바일에서 숫자 키보드 우선 호출
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            placeholder="YYYYMMDD"
            className="w-full bg-transparent border-b border-[#E2C37B] py-1 outline-none text-white focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* 3. 유연한 공간 (핵심!)
          평소에는 285px 정도의 공간을 유지하려 노력하지만, 
          키보드가 올라오면 가장 먼저 크기를 줄여 버튼을 보호합니다. 
      */}
      <div className="flex-1 min-h-[20px]" />

      {/* 4. 시작하기 버튼 (하단 고정 및 동반 상승) */}
      <div className="w-full px-[72px] pb-10 flex-none">
        <button
          disabled={!gender || !userName || !birth}
          onClick={onNext}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all
            ${gender && userName && birth
              ? "bg-[#E2C37B] text-black shadow-[0_0_15px_rgba(226,195,123,0.3)]"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}