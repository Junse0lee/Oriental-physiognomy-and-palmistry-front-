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

  // 💡 생년월일이 비어있지 않은데 8자리가 아닐 경우를 체크합니다.
  const isBirthInvalid = birth.length > 0 && birth.length !== 8;

  return (
    <div className="w-full h-full flex flex-col items-center">

      {/* 1. 성별 선택 영역 */}
      <div className="w-full flex justify-between px-[72px] mt-[45px] flex-none">
        {/* ... (성별 버튼 코드는 동일) ... */}
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

      {/* 2. 입력 영역 */}
      <div className="mt-[71px] w-full px-[72px] flex flex-col items-center flex-none">
        <div className="flex items-center space-x-4 w-full">
          <label className="text-[#E2C37B] font-medium shrink-0 w-20">이름 :</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름 입력"
            className="w-full bg-transparent border-b border-[#E2C37B] py-1 outline-none text-white focus:border-white transition-colors"
          />
        </div>

        <div className="flex flex-col w-full mt-[13px]">
          <div className="flex items-center space-x-4 w-full">
            <label className="text-[#E2C37B] font-medium shrink-0 w-20">생년월일 :</label>
            <input
              type="text"
              inputMode="numeric"
              value={birth}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value.length <= 8) setBirth(value);
              }}
              placeholder="YYYYMMDD"
              className={`w-full bg-transparent border-b py-1 outline-none text-white transition-colors 
                ${isBirthInvalid ? "border-red-500" : "border-[#E2C37B] focus:border-white"}`}
            />
          </div>

          {/* 💡 에러 메시지: 8자리가 아닐 때만 등장 */}
          <div className="h-5 mt-1 ml-24"> {/* 라벨 넓이만큼 마진을 주어 정렬 */}
            {isBirthInvalid && (
              <p className="text-red-500 text-[10px] animate-pulse">
                * 생년월일 숫자 8자리를 입력해주세요.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[20px]" />

      {/* 4. 시작하기 버튼 */}
      <div className="w-full px-[72px] pb-10 flex-none">
        <button
          disabled={!gender || !userName || birth.length !== 8}
          onClick={onNext}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all
            ${gender && userName && birth.length === 8
              ? "bg-[#E2C37B] text-black shadow-[0_0_15px_rgba(226,195,123,0.3)]"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}