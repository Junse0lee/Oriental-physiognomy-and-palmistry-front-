"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion"; // ✅ PanInfo 추가

interface Props {
  userName: string;
  onFaceNext: () => void;
  onHandNext: () => void;
  onMatchingNext: () => void;
}

// 카드 데이터의 구조를 정의합니다.
interface CardData {
  id: number;
  title: string;
  desc: string;
  icon: string;
  action: () => void;
}

export default function Choose_Hand_Face({ userName, onFaceNext, onHandNext, onMatchingNext }: Props) {
  const [index, setIndex] = useState(0);

  const cards: CardData[] = [
    { id: 0, title: "천부적 관상", desc: "당신의 얼굴에 새겨진\n하늘의 뜻은?", icon: "👤", action: onFaceNext },
    { id: 1, title: "손금의 비밀", desc: "운명의 선들이 그려내는\n당신의 내일", icon: "✋", action: onHandNext },
    { id: 2, title: "운명적 궁합", desc: "서로의 기운이 만나는\n인연의 깊이는?", icon: "💖", action: onMatchingNext },
  ];

  const nextCard = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  // ✅ any 대신 MouseEvent/TouchEvent와 PanInfo 타입을 명시합니다.
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextCard();
    } else if (info.offset.x > swipeThreshold) {
      prevCard();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white text-black overflow-hidden py-10">
      <div className="text-center mb-10 flex-none">
        <p className="text-gray-400">환영합니다.</p>
        <h2 className="text-2xl font-bold border-b border-black pb-1 inline-block">
          {userName || "USER"} 님
        </h2>
      </div>

      <div className="flex-1 min-h-[20px]" />

      <div className="relative w-full max-w-sm flex items-center justify-center px-4 flex-none touch-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileTap={{ scale: 0.95 }}
            onClick={cards[index].action} // ✅ 카드 클릭 시 액션 실행
            className="w-[280px] aspect-[3/4] bg-gray-50 border border-gray-200 rounded-[30px] shadow-lg flex flex-col items-center justify-between p-8 cursor-grab active:cursor-grabbing"
          >
            <div className="w-full py-3 bg-white rounded-xl text-center border border-gray-100 shadow-sm pointer-events-none">
              <span className="font-bold text-lg">{cards[index].title}</span>
            </div>
            <div className="text-8xl my-4 pointer-events-none">{cards[index].icon}</div>
            <div className="text-center pointer-events-none">
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap">
                {cards[index].desc}
              </p>
              <p className="mt-4 text-[10px] text-blue-400 font-bold animate-pulse">
                카드 클릭 시 시작하기
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex-[1.5] w-full flex flex-col items-center justify-center space-y-8">
        <div className="flex space-x-2">
          {cards.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${index === i ? "w-4 bg-black" : "bg-gray-300"}`} />
          ))}
        </div>
        <p className="text-[10px] text-gray-400">좌우로 밀어서 메뉴를 선택하세요</p>
      </div>
    </div>
  );
}