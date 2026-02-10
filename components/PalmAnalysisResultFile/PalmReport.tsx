// src/components/analysis/PalmReport.tsx
import React, { useEffect, useRef, memo } from 'react';

interface Props {
    reportHtml: string;
    selectedLine: string | null;
}

const PalmReportComponent: React.FC<Props> = ({ reportHtml, selectedLine }) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedLine || !scrollAreaRef.current) return;

        // 1. Array.from으로 배열 변환
        const cards = Array.from(
            scrollAreaRef.current.querySelectorAll('.palm-scroll-area > div')
        );

        let targetCard: HTMLElement | null = null;

        for (const card of cards) {
            // 2. HTMLElement 타입인지 체크 (이게 있어야 scrollIntoView 에러가 안 납니다)
            if (card instanceof HTMLElement) {
                const text = card.innerText;
                if (
                    (selectedLine === 'life' && text.includes('생명선')) ||
                    (selectedLine === 'head' && text.includes('두뇌선')) ||
                    (selectedLine === 'heart' && text.includes('감정선')) ||
                    (selectedLine === 'fate' && text.includes('운명선'))
                ) {
                    targetCard = card;
                    break;
                }
            }
        }

        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [selectedLine, reportHtml]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-transparent">
            <div className="px-6 pt-6 pb-2 flex-shrink-0">
                <p className="text-[#E2C37B] text-[10px] font-bold tracking-widest uppercase opacity-50">Swipe Cards</p>
                <h2 className="text-xl font-black text-white">당신의 운명 카드</h2>
            </div>

            <div className="palm-report-container flex-1 min-h-0 relative" ref={scrollAreaRef}>
                <div
                    dangerouslySetInnerHTML={{ __html: reportHtml }}
                    className="h-full w-full"
                />
            </div>

            <style jsx global>{`
                .palm-wrapper > h2, 
                .palm-wrapper > div:first-child:not(.palm-scroll-area),
                .palm-wrapper hr,
                .progress-bar { 
                    display: none !important; 
                }

                .palm-wrapper {
                    background: transparent !important;
                    padding: 0 !important;
                    height: 100% !important;
                }

                .palm-scroll-area {
                    display: flex !important;
                    flex-direction: row !important;
                    gap: 14px !important;
                    overflow-x: auto !important;
                    overflow-y: hidden !important;
                    padding: 0 20px 30px 20px !important;
                    scroll-snap-type: x mandatory !important;
                    height: 100% !important;
                    -webkit-overflow-scrolling: touch;
                }
                
                .palm-scroll-area::-webkit-scrollbar { display: none; }

                .palm-scroll-area > div {
                    flex: 0 0 88% !important; 
                    width: 88% !important;
                    height: 100% !important; 
                    max-height: 100% !important;
                    scroll-snap-align: center !important;
                    background: rgba(22, 22, 24, 0.95) !important;
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 32px !important;
                    padding: 28px 24px !important;
                    display: block !important; 
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch;
                }

                .palm-wrapper h3 { 
                    font-size: 1.15rem !important;
                    color: #ffffff !important;
                    margin-bottom: 18px !important; 
                    font-weight: 800 !important;
                }

                .palm-wrapper b { 
                    color: #E2C37B !important;
                    font-size: 1.05rem !important;
                    margin-top: 15px;
                    display: block;
                }

                .palm-wrapper div { 
                    color: rgba(255, 255, 255, 0.85) !important; 
                    line-height: 1.8 !important; 
                    font-size: 0.95rem !important;
                    padding-bottom: 50px !important; 
                }

                .palm-scroll-area > div::-webkit-scrollbar { width: 3px; }
                .palm-scroll-area > div::-webkit-scrollbar-thumb { 
                    background: rgba(226, 195, 123, 0.3); 
                    border-radius: 10px; 
                }
            `}</style>
        </div>
    );
};

// ✅ 컴포넌트 이름을 PalmReportComponent로 통일했습니다.
const PalmReport = memo(PalmReportComponent, (prev, next) => {
    return prev.reportHtml === next.reportHtml;
});

export default PalmReport;