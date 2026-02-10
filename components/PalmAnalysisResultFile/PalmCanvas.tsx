// src/components/analysis/PalmCanvas.tsx
import React from 'react';
import Image from 'next/image';
import { AnalysisData } from './types';

interface Props {
    imageUrl: string;
    data: AnalysisData;
    selectedLine: string | null;
    isVisible: boolean;
    onReset: () => void;
}

const PalmCanvas: React.FC<Props> = ({ imageUrl, data, selectedLine, isVisible, onReset }) => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/40">
            {/* 배경 이미지: 선택된 선이 있을 때 흐려짐 */}
            <Image
                src={imageUrl}
                alt="Hand Analysis"
                fill
                className={`transition-all duration-1000 object-contain ${selectedLine ? 'opacity-30 blur-md scale-105' : 'opacity-100'
                    }`}
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
                            key={line.name}
                            points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                            fill="none"
                            // ✅ 선택 시 순백색, 아닐 시 데이터의 RGB 색상
                            stroke={isSelected ? "#ffffff" : `rgb(${line.color.join(',')})`}
                            // ✅ 선택 시 두께를 16으로 키워 더 돋보이게 함
                            strokeWidth={isSelected ? "16" : "6"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                opacity: isVisible && isFocused ? 1 : 0.1, // 비선택 선은 투명도를 확 낮춤
                                // ✅ 이중 글로우 효과로 반짝임 극대화
                                filter: isSelected
                                    ? 'drop-shadow(0 0 8px #fff) drop-shadow(0 0 20px rgba(255,255,255,0.6))'
                                    : 'none',
                                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                                zIndex: isSelected ? 50 : 1
                            }}
                        />
                    );
                })}

                {/* 구역(Mounts) 점 */}
                {data.mounts && Object.entries(data.mounts).map(([name, coords]) => (
                    <circle
                        key={`mount-${name}`}
                        cx={coords[0]}
                        cy={coords[1]}
                        r="10"
                        fill="#E2C37B"
                        style={{
                            opacity: isVisible && !selectedLine ? 0.4 : 0,
                            filter: 'drop-shadow(0 0 8px #E2C37B)',
                            transition: 'opacity 0.5s ease'
                        }}
                    />
                ))}
            </svg>

            {/* 전체보기 버튼 */}
            {selectedLine && (
                <button
                    onClick={onReset}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#E2C37B] text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(226,195,123,0.4)] transition-transform active:scale-95"
                >
                    전체보기 ↩
                </button>
            )}
        </div>
    );
};

export default PalmCanvas;