import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/** 1. 타입 정의 */
interface LineData {
    name: string;
    label: string;
    color: [number, number, number];
    points: [number, number][];
}

interface AnalysisData {
    lines: LineData[];
    // Record를 사용하여 any 없이 mounts 타입 정의
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
    const [selectedLine, setSelectedLine] = useState<string | null>(null);

    // 1. 초기 등장 애니메이션 (Cascading render 방지를 위해 지연 실행)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // 2. 리포트 카드 클릭 이벤트 핸들러 (이벤트 타입을 Event로 지정하여 any 제거)
    useEffect(() => {
        const handleCardClick = (e: Event) => {
            const target = e.target;

            // target이 HTMLElement인 경우에만 텍스트 추출 및 카드 찾기
            if (target instanceof HTMLElement) {
                const card = target.closest('.palm-scroll-area > div');
                if (!card) return;

                const text = (card as HTMLElement).innerText;

                // 애니메이션 재발동을 위해 일시적 초기화 후 설정
                setSelectedLine(null);
                setTimeout(() => {
                    if (text.includes("생명선")) setSelectedLine("life");
                    else if (text.includes("두뇌선")) setSelectedLine("head");
                    else if (text.includes("감정선")) setSelectedLine("heart");
                    else if (text.includes("운명선")) setSelectedLine("fate");
                }, 50);
            }
        };

        const container = document.querySelector('.palm-report-container');
        if (container) {
            container.addEventListener('click', handleCardClick);
        }

        return () => {
            if (container) {
                container.removeEventListener('click', handleCardClick);
            }
        };
    }, [data.report]);

    return (
        <div className="flex flex-col h-screen w-full max-w-[500px] mx-auto bg-[#0F0F1E] overflow-hidden font-sans">

            {/* [상단 영역] 이미지 및 SVG 오버레이 */}
            <div className="relative w-full aspect-square flex-shrink-0 bg-black z-10 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt="Hand Analysis"
                    fill
                    className={`object-cover transition-all duration-700 ${selectedLine ? 'opacity-30 scale-105' : 'opacity-100 scale-100'}`}
                    unoptimized
                />

                <svg
                    viewBox={`0 0 ${data.image_size.width} ${data.image_size.height}`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {data.lines.map((line) => {
                        const isFocused = !selectedLine || selectedLine === line.name;
                        const isSelected = selectedLine === line.name;

                        return (
                            <polyline
                                // key를 바꿔서 클릭할 때마다 애니메이션 강제 재실행
                                key={`${line.name}-${selectedLine}`}
                                points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                                fill="none"
                                stroke={`rgb(${line.color.join(',')})`}
                                strokeWidth={isSelected ? "12" : "6"}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-700"
                                style={{
                                    opacity: isVisible && isFocused ? 1 : 0,
                                    filter: isSelected
                                        ? 'drop-shadow(0px 0px 30px white) brightness(1.5)'
                                        : 'drop-shadow(0px 0px 10px rgba(0,0,0,0.5))',
                                    strokeDasharray: isSelected ? "5000" : "none",
                                    strokeDashoffset: isSelected ? "5000" : "0",
                                    animation: isSelected ? "drawPath 1.2s forwards ease-out" : "none"
                                }}
                            />
                        );
                    })}

                    {/* 구역(Mounts) 표시 (any 없이 Object.entries 사용) */}
                    {!selectedLine && data.mounts && Object.entries(data.mounts).map(([name, pos]) => (
                        <g key={name} className="transition-opacity duration-500" style={{ opacity: isVisible ? 1 : 0 }}>
                            <circle cx={pos[0]} cy={pos[1]} r="40" fill="none" stroke="#E2C37B" strokeWidth="4" strokeDasharray="10 5" className="animate-pulse" />
                            <text
                                x={pos[0]}
                                y={pos[1] - 70}
                                fill="#E2C37B"
                                fontSize="42"
                                fontWeight="900"
                                textAnchor="middle"
                                style={{ filter: 'drop-shadow(0px 0px 10px black)' }}
                            >
                                {name}
                            </text>
                        </g>
                    ))}
                </svg>

                {selectedLine && (
                    <button
                        onClick={() => setSelectedLine(null)}
                        className="absolute bottom-16 right-6 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold border border-white/30 active:scale-95 transition-transform"
                    >
                        전체 보기 ↩
                    </button>
                )}
            </div>

            {/* [하단 영역] 운명 리포트 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto bg-white rounded-t-[40px] -mt-10 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] custom-scrollbar">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-5 mb-8" />

                <div className="px-6 pb-24">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2 text-center">📜 당신의 운명 기록부</h2>
                    <p className="text-gray-400 text-[10px] text-center mb-8 uppercase tracking-widest">AI Analysis Result</p>

                    <div
                        className="palm-report-container select-none"
                        dangerouslySetInnerHTML={{ __html: data.report }}
                    />

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full mt-12 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl active:scale-[0.97] transition-all"
                    >
                        다시 측정하기
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes drawPath { 
                    from { stroke-dashoffset: 5000; }
                    to { stroke-dashoffset: 0; } 
                }
                
                .custom-scrollbar::-webkit-scrollbar { width: 0; }

                .palm-scroll-area { display: flex !important; flex-direction: column !important; gap: 16px !important; }

                .palm-scroll-area > div { 
                    flex: none !important; 
                    width: 100% !important; 
                    background: #fdfdfd !important; 
                    border-radius: 28px !important; 
                    padding: 24px !important; 
                    border: 1px solid #eee !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    cursor: pointer !important;
                }

                .palm-scroll-area > div:active {
                    transform: scale(0.96);
                    background: #fff9eb !important;
                    border-color: #E2C37B !important;
                }

                .palm-wrapper h3 { font-size: 1.25rem !important; color: #111 !important; margin-bottom: 10px !important; font-weight: 900 !important; }
                .palm-wrapper b { color: #E2C37B !important; }
                .palm-wrapper div { color: #4a5568 !important; line-height: 1.8 !important; font-size: 0.95rem !important; }
            `}</style>
        </div>
    );
};

export default PalmAnalysisResult;