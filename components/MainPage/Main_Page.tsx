"use client";

import React, { useState } from "react";

interface Props {
  onNext: () => void;
  userName: string;
  setUserName: (name: string) => void;
  // 부모로부터 전달받는 주사용 손 상태와 변경 함수
  userHand: "left" | "right" | null;
  setUserHand: (hand: "left" | "right") => void;
}

export default function MainPage({ onNext, userName, setUserName, userHand, setUserHand }: Props) {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birth, setBirth] = useState("");

  const isBirthInvalid = birth.length > 0 && birth.length !== 8;

  // ✅ 핸들러 함수: 로컬 상태가 아닌 부모의 setUserHand를 직접 호출하도록 연결
  const handleHandSelect = (selectedHand: "left" | "right") => {
    setUserHand(selectedHand);
  };

  return (
    <div className="w-full h-full max-w-[450px] mx-auto flex flex-col items-center">

      {/* 1. 성별 선택 영역 */}
      <div className="w-full flex justify-around px-[10%] mt-[45px] flex-none">
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
      <div className="mt-[60px] w-full px-[12%] flex flex-col space-y-6 flex-none">
        {/* 이름 입력 */}
        <div className="flex items-center w-full">
          <label className="text-[#E2C37B] font-medium shrink-0 w-16 sm:w-20 text-sm sm:text-base">이름 :</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름 입력"
            className="flex-1 bg-transparent border-b border-[#E2C37B] py-1 outline-none text-white focus:border-white transition-colors min-w-0"
          />
        </div>

        {/* 생년월일 입력 */}
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full">
            <label className="text-[#E2C37B] font-medium shrink-0 w-16 sm:w-20 text-sm sm:text-base">생년월일 :</label>
            <input
              type="text"
              inputMode="numeric"
              value={birth}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value.length <= 8) setBirth(value);
              }}
              placeholder="YYYYMMDD"
              className={`flex-1 bg-transparent border-b py-1 outline-none text-white transition-colors min-w-0
                ${isBirthInvalid ? "border-red-500" : "border-[#E2C37B] focus:border-white"}`}
            />
          </div>
          <div className="h-5 mt-1 ml-16 sm:ml-20">
            {isBirthInvalid && (
              <p className="text-red-500 text-[10px] animate-pulse">
                * 숫자 8자리를 입력해주세요.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. ✅ 주사용 손 선택 영역 (부모의 userHand 상태와 연동) */}
      <div className="mt-8 w-full px-[12%] flex flex-col items-center flex-none">
        <p className="text-[#E2C37B] text-sm font-medium mb-4">주로 사용하는 손은 어디인가요?</p>
        <div className="flex space-x-8">
          <button
            onClick={() => handleHandSelect("left")}
            className={`px-8 py-2 rounded-xl border-2 transition-all text-sm font-bold
              ${userHand === "left" ? "border-[#E2C37B] bg-[#E2C37B] text-black" : "border-gray-600 text-gray-400 bg-transparent"}`}
          >
            왼손
          </button>
          <button
            onClick={() => handleHandSelect("right")}
            className={`px-8 py-2 rounded-xl border-2 transition-all text-sm font-bold
              ${userHand === "right" ? "border-[#E2C37B] bg-[#E2C37B] text-black" : "border-gray-600 text-gray-400 bg-transparent"}`}
          >
            오른손
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[20px]" />

      {/* 4. 시작하기 버튼: 부모로부터 온 userHand가 있어야 활성화 */}
      <div className="w-full px-[12%] pb-10 flex-none">
        <button
          disabled={!gender || !userName || birth.length !== 8 || !userHand}
          onClick={onNext}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all
            ${gender && userName && birth.length === 8 && userHand
              ? "bg-[#E2C37B] text-black shadow-[0_0_15px_rgba(226,195,123,0.3)]"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}