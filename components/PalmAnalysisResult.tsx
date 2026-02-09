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

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleCardClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const card = target.closest('.palm-scroll-area > div') as HTMLElement;

            if (card) {
                const text = card.innerText;

                // ✅ 해결 1: 불필요한 null 초기화와 setTimeout을 제거하여 상태를 즉시 업데이트
                // 이렇게 하면 브라우저가 첫 카드로 튕기지 않습니다.
                let nextLine: string | null = null;
                if (text.includes("생명선")) nextLine = "life";
                else if (text.includes("두뇌선")) nextLine = "head";
                else if (text.includes("감정선")) nextLine = "heart";
                else if (text.includes("운명선")) nextLine = "fate";

                setSelectedLine(nextLine);

                // ✅ 해결 2: 스크롤 포커스는 클릭한 카드에 그대로 유지
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        };

        const container = document.querySelector('.palm-report-container');
        if (container) container.addEventListener('click', handleCardClick);
        return () => container?.removeEventListener('click', handleCardClick);
    }, [data.report]); // selectedLine 의존성을 제거하여 무한 렌더링 방지

    return (
        <div className="flex flex-col h-screen w-full max-w-[500px] mx-auto bg-[#0a0a0c] overflow-hidden text-white font-sans">

            {/* 1. 고정 헤더 */}
            <header className="flex-shrink-0 p-6 flex justify-between items-center z-30 bg-gradient-to-b from-[#0a0a0c] to-transparent">
                <button onClick={() => window.location.reload()} className="p-2 text-white/40 hover:text-white transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-sm font-bold tracking-[0.3em] text-[#E2C37B]">RESULT</h1>
                <div className="w-10" />
            </header>

            {/* 2. 메인 이미지 영역 (규격 수정 버전) */}
            <main className="relative flex-1 w-full flex items-center justify-center p-4 min-h-0">
                <div className="relative w-full h-full max-h-full flex items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/40">
                    <Image
                        src={imageUrl}
                        alt="Hand Analysis"
                        fill
                        className={`transition-all duration-1000 object-contain ${selectedLine ? 'opacity-30 blur-md scale-105' : 'opacity-100'}`}
                        unoptimized
                    />

                    <svg
                        viewBox={`0 0 ${data.image_size.width} ${data.image_size.height}`}
                        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {data.lines.map((line) => {
                            const isFocused = !selectedLine || selectedLine === line.name;
                            const isSelected = selectedLine === line.name;
                            return (
                                <polyline
                                    key={line.name} // ✅ 핵심: key에 selectedLine을 빼야 선이 새로고침(튕김)되지 않습니다.
                                    points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                                    fill="none"
                                    stroke={`rgb(${line.color.join(',')})`}
                                    strokeWidth={isSelected ? "14" : "6"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        opacity: isVisible && isFocused ? 1 : 0,
                                        filter: isSelected ? 'drop-shadow(0 0 12px white)' : 'none',
                                        strokeDasharray: isSelected ? "3000" : "0",
                                        strokeDashoffset: isSelected ? "0" : "0",
                                        // 애니메이션은 오직 '처음 나타날 때' 혹은 '강조될 때' 스타일 전환으로 처리
                                        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {selectedLine && (
                        <button
                            onClick={() => setSelectedLine(null)}
                            className="absolute bottom-6 z-30 bg-[#E2C37B] text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(226,195,123,0.4)]"
                        >
                            전체보기 ↩
                        </button>
                    )}
                </div>
            </main>

            {/* 3. 카드뉴스형 가로 스크롤 섹션 */}
            <section className="flex-shrink-0 pb-8 pt-4">
                <div className="px-8 mb-4">
                    <p className="text-[#E2C37B] text-[10px] font-bold tracking-widest uppercase opacity-60">Swipe for details</p>
                    <h2 className="text-xl font-black">당신의 운명 카드</h2>
                </div>

                <div className="palm-report-container overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: data.report }} />
                </div>
            </section>

            <style jsx global>{`
                /* 불필요한 keyframe drawPath 제거 또는 유지 (처음 등장용) */
                @keyframes drawPath { to { stroke-dashoffset: 0; } }
                
                .palm-scroll-area {
                    display: flex !important;
                    flex-direction: row !important;
                    gap: 16px !important;
                    overflow-x: auto !important;
                    padding: 0 32px 20px 32px !important;
                    scroll-snap-type: x mandatory !important;
                    -webkit-overflow-scrolling: touch;
                }

                .palm-scroll-area::-webkit-scrollbar { display: none; }

                .palm-scroll-area > div {
                    flex: 0 0 85% !important;
                    width: 85% !important;
                    scroll-snap-align: center !important;
                    background: rgba(255, 255, 255, 0.03) !important;
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    border-radius: 28px !important;
                    padding: 28px !important;
                    min-height: 180px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1) !important;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
                }

                .palm-wrapper { background: transparent !important; padding: 0 !important; }
                .palm-wrapper h2 { display: none; }
                .palm-wrapper h3 { color: #fff !important; font-size: 1.3rem !important; margin-bottom: 12px !important; font-weight: 800 !important; }
                .palm-wrapper b { color: #E2C37B !important; font-size: 1rem !important; }
                .palm-wrapper div { color: rgba(255, 255, 255, 0.7) !important; line-height: 1.6 !important; font-size: 0.95rem !important; }
                
                .palm-scroll-area > div:active { 
                    border-color: #E2C37B !important; 
                    transform: scale(0.96); 
                }
            `}</style>
        </div>
    );
};

export default PalmAnalysisResult;