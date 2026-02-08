"use client";
import React from "react";


interface Props {
    onNext?: () => void;
    userName: string;
}

export default function LoadingPage({ onNext, userName }: Props) {
    return (
        <div className="w-full text-center mt-[70px] flex-none relative">
            <h1 className="text-sm text-[#E2C37B] tracking-widest uppercase">
                {userName}님의 운명을 분석 중입니다...
            </h1>
            <div className="w-full h-[1px] bg-purple-500/20 mt-[16px]" />
        </div>
    )
}


