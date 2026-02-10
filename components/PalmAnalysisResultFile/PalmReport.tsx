// 리포트 카드 담당
// DangerouslySetInnerHTML 사용, 가로 스크롤 CSS 스타일링 담당

import React from 'react';

interface Props {
    reportHtml: string;
}

const PalmReport: React.FC<Props> = ({ reportHtml }) => {
    return (
        <section className="flex-shrink-0 pb-8 pt-4">
            <div className="px-8 mb-4">
                <p className="text-[#E2C37B] text-[10px] font-bold tracking-widest uppercase opacity-60">Swipe for details</p>
                <h2 className="text-xl font-black">당신의 운명 카드</h2>
            </div>

            <div className="palm-report-container overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: reportHtml }} />
            </div>

            <style jsx global>{`
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
                .palm-wrapper b { color: #E2C37B !important; font-size: 1rem !important; }
                .palm-wrapper h3 { color: #fff !important; font-size: 1.3rem !important; margin-bottom: 12px !important; font-weight: 800 !important; }
                .palm-wrapper div { color: rgba(255, 255, 255, 0.7) !important; line-height: 1.6 !important; font-size: 0.95rem !important; }
            `}</style>
        </section>
    );
};

export default PalmReport;