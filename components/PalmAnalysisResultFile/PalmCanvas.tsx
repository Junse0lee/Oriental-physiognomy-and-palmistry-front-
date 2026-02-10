// 이미지 및 시각화 담당
// 원본 로직 유지: selectedLine에 따른 blur 효과, 선 (polyLine) 그리기
// 추가된 로직: 손바닥 구역 (mounts) 시각화 점 추가

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
                                key={line.name}
                                points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                                fill="none"
                                stroke={`rgb(${line.color.join(',')})`}
                                strokeWidth={isSelected ? "14" : "6"}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    opacity: isVisible && isFocused ? 1 : 0,
                                    filter: isSelected ? 'drop-shadow(0 0 12px white)' : 'none',
                                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                                }}
                            />
                        );
                    })}

                    {/* 구역(Mounts) 점 표시 */}
                    {data.mounts && Object.entries(data.mounts).map(([name, coords]) => (
                        <circle
                            key={`mount-${name}`}
                            cx={coords[0]}
                            cy={coords[1]}
                            r="10"
                            fill="#E2C37B"
                            style={{
                                opacity: isVisible && !selectedLine ? 0.5 : 0,
                                filter: 'drop-shadow(0 0 8px #E2C37B)',
                                transition: 'opacity 0.5s ease'
                            }}
                        />
                    ))}
                </svg>

                {selectedLine && (
                    <button
                        onClick={onReset}
                        className="absolute bottom-6 z-30 bg-[#E2C37B] text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(226,195,123,0.4)]"
                    >
                        전체보기 ↩
                    </button>
                )}
            </div>
        </main>
    );
};

export default PalmCanvas;