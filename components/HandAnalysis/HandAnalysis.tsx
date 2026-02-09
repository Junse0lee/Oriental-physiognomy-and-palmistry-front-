"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  onBack: () => void;
  onStartAnalysis: (image: string) => void; // 이름 변경: onNext -> onStartAnalysis
}

export default function HandAnalysis({ onStartAnalysis, onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // 1. 카메라 시작 로직을 useCallback으로 감쌉니다.
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false,
      });

      // 비디오 엘리먼트에 스트림 연결
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // 핵심: 상태 업데이트를 아주 약간 늦게 처리하여 렌더링 충돌 방지
      // 리액트의 '렌더링 사이클' 밖에서 실행되도록 유도합니다.
      setTimeout(() => {
        setStream(mediaStream);
      }, 0);

    } catch (err) {
      console.error("카메라 접근 에러:", err);
    }
  }, []); // 빈 배열: 함수를 딱 한 번만 만듭니다.

  // 컴포넌트 마운트 시 최초 1회 카메라 켜기
  useEffect(() => {
    startCamera();

    // 컴포넌트 언마운트 시(페이지 이동 등) 카메라 완전 종료
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  // 2. 촬영 버튼: 사진 찍고 '카메라 끄기'
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !stream) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);

      // ✅ [카메라 하드웨어 종료] 
      // 모든 비디오 트랙을 중지시켜서 카메라 렌즈 옆의 불빛을 끕니다.
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null); // 상태 초기화
    }
  };

  // 3. 다시 찍기: 저장된 이미지를 지우고 '카메라 다시 켜기'
  const handleRetry = () => {
    setCapturedImage(null);
    startCamera(); // 꺼졌던 카메라를 다시 활성화
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#1A1A1A]">
      <div className="w-full h-[1px] bg-purple-500/50 mb-6" />

      {/* 카메라 프리뷰 / 결과 이미지 영역 */}
      <div className="relative w-full aspect-[3/4] bg-black rounded-lg overflow-hidden border-2 border-purple-500/30">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* 가이드 라인 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-2 border-dashed border-white/50 rounded-[100px] flex items-center justify-center">
                <p className="text-white text-sm bg-black/40 px-4 py-2 rounded-full">
                  손바닥을 중앙에 맞춰주세요
                </p>
              </div>
            </div>
          </>
        ) : (
          <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="w-full mt-auto mb-10 px-6">
        <div className="flex justify-around items-center px-10">

          {/* 촬영/다시찍기 버튼 컨트롤 */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={capturedImage ? handleRetry : handleCapture}
              className="w-16 h-16 bg-[#E2C37B] rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all"
            >
              {capturedImage ? (
                <span className="text-white font-bold text-sm text-center">다시<br />켜기</span>
              ) : (
                <div className="w-8 h-8 rounded-full border-4 border-white" />
              )}
            </button>
            <span className="text-xs text-gray-400">{capturedImage ? "재촬영" : "셔터"}</span>
          </div>

          {/* AI 분석 결과 확인 버튼 */}
          <div className="flex flex-col items-center gap-2">
            <button
              disabled={!capturedImage}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all ${capturedImage ? 'bg-purple-600' : 'bg-gray-700 opacity-50'}`}
              onClick={() => {
                if (capturedImage) {
                  onStartAnalysis(capturedImage);
                }
              }}
            >
              <span className="text-white font-bold text-sm">결과 확인</span>
            </button>
            <span className="text-xs text-gray-400">분석하기</span>
          </div>

        </div>

        <button onClick={onBack} className="mt-8 text-xs text-gray-500 underline w-full text-center">
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}