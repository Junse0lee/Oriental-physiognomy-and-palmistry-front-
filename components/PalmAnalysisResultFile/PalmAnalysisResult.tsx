import React, { useEffect, useState, useCallback } from 'react';
import PalmCanvas from './PalmCanvas';
import PalmReport from './PalmReport';
import { AnalysisData } from './types';

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

    // 1. 타입을 MouseEvent 대신 Event로 통일하여 addEventListener와 타입을 맞춥니다.
    const handleCardClick = useCallback((e: Event) => {
        const target = e.target as HTMLElement;

        // .palm-scroll-area 안에 있는 개별 카드 div를 찾음
        const card = target.closest('.palm-scroll-area > div') as HTMLElement;

        if (card) {
            e.stopPropagation();

            const h3 = card.querySelector('h3');
            const titleText = h3 ? h3.innerText : card.innerText;

            let nextLine: string | null = null;

            if (titleText.includes("감정선")) nextLine = "heart";
            else if (titleText.includes("두뇌선")) nextLine = "head";
            else if (titleText.includes("운명선")) nextLine = "fate";
            else if (titleText.includes("생명선")) nextLine = "life";

            if (!nextLine) {
                const found = data.lines.find(l => titleText.includes(l.label) || titleText.includes(l.name));
                if (found) nextLine = found.name;
            }

            if (nextLine) {
                setSelectedLine(nextLine);
            }

            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, [data.lines]);

    useEffect(() => {
        const container = document.querySelector('.palm-report-container');
        if (!container) return;

        // ✅ handleCardClick이 이미 (e: Event) => void 타입이므로 any 없이 등록 가능합니다.
        container.addEventListener('click', handleCardClick);

        return () => {
            container.removeEventListener('click', handleCardClick);
        };
    }, [handleCardClick, data.report]);

    return (
        <div className="flex flex-col h-screen w-full max-w-[500px] mx-auto bg-[#0a0a0c] overflow-hidden text-white font-sans px-[10px]">
            <header className="flex-shrink-0 py-3 flex justify-between items-center z-30">
                <button onClick={() => window.location.reload()} className="p-2 text-white/40">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[10px] font-bold tracking-[0.4em] text-[#E2C37B] opacity-70">RESULT</h1>
                <div className="w-10" />
            </header>

            <section className="h-[35vh] w-full flex-shrink-0 mt-2 mb-4">
                <PalmCanvas
                    imageUrl={imageUrl}
                    data={data}
                    selectedLine={selectedLine}
                    isVisible={isVisible}
                    onReset={() => setSelectedLine(null)}
                />
            </section>

            <section className="flex-1 min-h-0 overflow-hidden bg-[#111113]/40 rounded-t-[2.5rem] border-t border-white/5 shadow-inner">
                <PalmReport reportHtml={data.report} selectedLine={selectedLine} />
            </section>
        </div>
    );
};

export default PalmAnalysisResult;