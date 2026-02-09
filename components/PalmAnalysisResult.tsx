import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// 1. 개별 손금 선 타입
interface LineData {
    name: string;
    label: string;
    color: [number, number, number];
    points: [number, number][];
}

// 2. 전체 분석 데이터 구조 정의 (mounts 타입 구체화)
interface AnalysisData {
    lines: LineData[];
    // key는 구역 이름(string), value는 [x, y] 좌표(number[])
    mounts: Record<string, [number, number]>;
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
                    {/* 손금 선 렌더링 */}
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
                                opacity: isVisible ? 0.9 : 0, // 투명도를 높여서 더 선명하게
                                filter: 'drop-shadow(0px 0px 8px rgba(226,195,123,0.6))', // 후광 효과 추가
                            }}
                        />
                    ))}

                    {/* ✅ [any 제거] 구역 표시 렌더링 */}
                    {data.mounts && Object.entries(data.mounts).map(([name, pos]) => (
                        <g key={name} className="transition-opacity duration-1000" style={{ opacity: isVisible ? 1 : 0 }}>
                            {/* 꽉 찬 원 대신 테두리만 있는 점선 원으로 변경 */}
                            <circle
                                cx={pos[0]}
                                cy={pos[1]}
                                r="35"
                                fill="none" // 안쪽 색상을 비워서 손금이 다 보이게 함
                                stroke="rgba(226, 195, 123, 0.6)" // 은은한 금색 테두리
                                strokeWidth="3"
                                strokeDasharray="8 4" // 점선 효과
                                className="animate-pulse" // 살아있는 느낌의 애니메이션
                            />

                            {/* 구역의 중심점만 살짝 표시 */}
                            <circle cx={pos[0]} cy={pos[1]} r="4" fill="#E2C37B" />

                            <text
                                x={pos[0]}
                                y={pos[1] - 50}
                                fill="#E2C37B"
                                fontSize="32"
                                fontWeight="bold"
                                textAnchor="middle"
                                style={{
                                    filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.9))',
                                    letterSpacing: '1px'
                                }}
                            >
                                {name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* ... (이하 리포트 영역 및 스타일은 이전과 동일) ... */}
            <div className="w-full px-4">
                <h2 className="text-[#E2C37B] text-xl font-bold mb-6 text-center tracking-widest">📜 당신의 운명 기록부</h2>
                <div className="palm-report-container" dangerouslySetInnerHTML={{ __html: data.report }} />
                <button onClick={() => window.location.reload()} className="w-full mt-10 py-4 bg-gradient-to-r from-[#E2C37B] to-[#b89b5e] text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-transform">
                    다른 손 분석하기
                </button>
            </div>

            <style jsx global>{`
                .palm-scroll-area { display: flex !important; flex-direction: column !important; gap: 16px !important; overflow: visible !important; }
                .palm-scroll-area > div { flex: none !important; width: 100% !important; min-width: 0 !important; background: white !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important; border-radius: 20px !important; padding: 20px !important; border-top-width: 8px !important; }
                .palm-wrapper h2 { display: none; }
                .palm-wrapper h3 { font-size: 1.1rem !important; color: #1a202c !important; margin-bottom: 8px !important; }
                .palm-wrapper b { color: #2d3748 !important; }
                .palm-wrapper div { color: #4a5568 !important; line-height: 1.5; }
            `}</style>
        </div>
    );
};

export default PalmAnalysisResult;