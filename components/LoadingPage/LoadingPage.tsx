"use client";
import React from "react";

interface Props {
    onNext?: () => void;
    userName: string;
}

export default function LoadingPage({ userName }: Props) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full animate-fadeIn">

            {/* 1. 메인 애니메이션 영역 (사진이 있던 그 위치쯤에 배치됩니다) */}
            <div className="relative flex items-center justify-center w-64 h-80 mb-12">

                {/* 바깥쪽 회전하는 후광 (천천히 회전) */}
                <div className="absolute w-48 h-48 border-2 border-[#E2C37B]/10 rounded-full animate-[spin_8s_linear_infinite]" />

                {/* 중간 크기 점선 원 (반대 방향 회전) */}
                <div className="absolute w-40 h-40 border-2 border-dashed border-[#E2C37B]/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />

                {/* 핵심: 밝게 빛나며 돌아가는 금색 로딩 바 */}
                <div className="absolute w-28 h-28 border-t-4 border-b-4 border-transparent border-l-[#E2C37B] border-r-[#E2C37B] rounded-full animate-spin shadow-[0_0_15px_rgba(226,195,123,0.4)]" />

                {/* 중앙 신비로운 아이콘 (맥박 뛰는 효과) */}
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl animate-pulse filter drop-shadow-[0_0_8px_rgba(226,195,123,0.8)]">
                        🔮
                    </span>
                </div>
            </div>

            {/* 2. 텍스트 영역 */}
            <div className="text-center px-8">
                <h1 className="text-lg text-[#E2C37B] tracking-[0.2em] font-bold">
                    {userName}님의 운명을 분석 중...
                </h1>

                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#E2C37B]/40 to-transparent mx-auto mt-4" />

                <p className="text-gray-400 text-xs mt-6 leading-loose animate-pulse tracking-widest">
                    하늘의 기운이 손금의 선을 따라<br />
                    당신의 이야기를 읽어내고 있습니다
                </p>
            </div>

        </div>
    );
}