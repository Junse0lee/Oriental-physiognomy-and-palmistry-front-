import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LineData {
    name: string;
    label: string;
    color: [number, number, number];
    points: [number, number][];
}

interface AnalysisData {
    lines: LineData[];
    report: string;
    image_size: { width: number; height: number };
}

interface Props {
    data: AnalysisData;
    imageUrl: string;
}

const PalmAnalysisResult: React.FC<Props> = ({ data, imageUrl }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full max-w-[500px] mx-auto flex flex-col items-center pb-20">
            {/* 1. 이미지 및 선 오버레이 영역 */}
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white mb-8">
                <Image
                    src={imageUrl}
                    alt="Hand"
                    width={data.image_size.width}
                    height={data.image_size.height}
                    className="w-full h-auto block"
                    unoptimized
                />

                <svg
                    viewBox={`0 0 ${data.image_size.width} ${data.image_size.height}`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {data.lines.map((line) => (
                        <polyline
                            key={line.name}
                            points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                            fill="none"
                            stroke={`rgb(${line.color.join(',')})`}
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-opacity duration-1000"
                            style={{
                                opacity: isVisible ? 0.8 : 0,
                                filter: 'drop-shadow(0px 0px 5px gold)',
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* 2. 설명 리포트 영역 (이 부분이 추가되었습니다) */}
            <div className="w-full px-4">
                <h2 className="text-[#E2C37B] text-xl font-bold mb-6 text-center tracking-widest">
                    📜 당신의 운명 기록부
                </h2>

                {/* 서버에서 보내준 HTML 리포트 출력 */}
                <div
                    className="palm-report-container"
                    dangerouslySetInnerHTML={{ __html: data.report }}
                />

                <button
                    onClick={() => window.location.reload()}
                    className="w-full mt-10 py-4 bg-gradient-to-r from-[#E2C37B] to-[#b89b5e] text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
                >
                    다른 손 분석하기
                </button>
            </div>

            {/* 3. 서버 HTML 레이아웃을 모바일에 맞게 강제 교정하는 스타일 */}
            <style jsx global>{`
                /* 가로로 나열되던 카드들을 세로로 정렬 */
                .palm-scroll-area { 
                    display: flex !important; 
                    flex-direction: column !important; 
                    gap: 16px !important; 
                    overflow: visible !important;
                }

                /* 각 카드 디자인 수정 */
                .palm-scroll-area > div {
                    flex: none !important;
                    width: 100% !important;
                    min-width: 0 !important;
                    background: white !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
                    border-radius: 20px !important;
                    padding: 20px !important;
                    border-top-width: 8px !important; /* 선 색상 강조 */
                }

                /* 텍스트 가독성 설정 */
                .palm-wrapper h2 { display: none; } /* 중복 타이틀 제거 */
                .palm-wrapper h3 {
                    font-size: 1.1rem !important;
                    color: #1a202c !important;
                    margin-bottom: 8px !important;
                }
                .palm-wrapper b { color: #2d3748 !important; }
                .palm-wrapper div { color: #4a5568 !important; line-height: 1.5; }
            `}</style>
        </div>
    );
};

export default PalmAnalysisResult;