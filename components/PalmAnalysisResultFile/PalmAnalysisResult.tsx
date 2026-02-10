import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const handleCardClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const card = target.closest('.palm-scroll-area > div') as HTMLElement;

            if (card) {
                const text = card.innerText;
                let nextLine: string | null = null;
                if (text.includes("생명선")) nextLine = "life";
                else if (text.includes("두뇌선")) nextLine = "head";
                else if (text.includes("감정선")) nextLine = "heart";
                else if (text.includes("운명선")) nextLine = "fate";

                setSelectedLine(nextLine);
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        };

        const container = document.querySelector('.palm-report-container');
        if (container) container.addEventListener('click', handleCardClick);
        return () => container?.removeEventListener('click', handleCardClick);
    }, [data.report]);

    return (
        <div className="flex flex-col h-screen w-full max-w-[500px] mx-auto bg-[#0a0a0c] overflow-hidden text-white font-sans">
            <header className="flex-shrink-0 p-6 flex justify-between items-center z-30 bg-gradient-to-b from-[#0a0a0c] to-transparent">
                <button onClick={() => window.location.reload()} className="p-2 text-white/40 hover:text-white transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-sm font-bold tracking-[0.3em] text-[#E2C37B]">RESULT</h1>
                <div className="w-10" />
            </header>

            <PalmCanvas
                imageUrl={imageUrl}
                data={data}
                selectedLine={selectedLine}
                isVisible={isVisible}
                onReset={() => setSelectedLine(null)}
            />

            <PalmReport reportHtml={data.report} />
        </div>
    );
};

export default PalmAnalysisResult;