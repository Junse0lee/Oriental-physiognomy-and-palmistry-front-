// src/components/analysis/PalmReport.tsx
import React from 'react';

interface Props {
    reportHtml: string;
}

const PalmReport: React.FC<Props> = ({ reportHtml }) => {
    return (
        <div className="flex flex-col h-full overflow-hidden bg-transparent">
            {/* 1. 타이틀 섹션 */}
            <div className="px-6 pt-6 pb-2 flex-shrink-0">
                <p className="text-[#E2C37B] text-[10px] font-bold tracking-widest uppercase opacity-50">Swipe Cards</p>
                <h2 className="text-xl font-black text-white">당신의 운명 카드</h2>
            </div>

            {/* 2. 카드 렌더링 영역 */}
            <div className="palm-report-container flex-1 min-h-0 relative">
                <div
                    dangerouslySetInnerHTML={{ __html: reportHtml }}
                    className="h-full w-full"
                />
            </div>

            <style jsx global>{`
                /* [지우기] 불필요한 백엔드 생성 요소들 제거 */
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

                /* [가로 스크롤] 카드 컨테이너 */
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

                /* [카드 개별 항목] 상하 스크롤 보장 */
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
                    overflow-x: hidden !important;
                    -webkit-overflow-scrolling: touch;
                }

                /* 텍스트 스타일 */
                .palm-wrapper h3 { 
                    font-size: 1.35rem !important;
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

                /* 스크롤바 디자인 */
                .palm-scroll-area > div::-webkit-scrollbar { width: 3px; }
                .palm-scroll-area > div::-webkit-scrollbar-thumb { 
                    background: rgba(226, 195, 123, 0.3); 
                    border-radius: 10px; 
                }
            `}</style>
        </div>
    );
};

export default PalmReport;