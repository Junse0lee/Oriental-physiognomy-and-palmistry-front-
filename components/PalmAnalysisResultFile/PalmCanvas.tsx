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
    // ✅ 이미지의 종횡비 계산 (예: 세로 1280 / 가로 960 = 1.333)
    const aspectRatio = data.image_size.height / data.image_size.width;

    return (
        <div
            className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/40"
            // ✅ Intrinsic Ratio 기법: 너비 대비 높이 비율만큼 하단 패딩을 주어 공간 확보
            style={{ paddingBottom: `${aspectRatio * 100}%` }}
        >
            <div className="absolute inset-0">
                {/* 배경 이미지 */}
                <Image
                    src={imageUrl}
                    alt="Hand Analysis"
                    fill
                    // ✅ object-cover를 사용하여 컨테이너를 꽉 채우고 선과 정확히 매칭
                    className={`transition-all duration-1000 object-cover ${selectedLine ? 'opacity-30 blur-md scale-105' : 'opacity-100'
                        }`}
                    unoptimized
                />

                <svg
                    viewBox={`0 0 ${data.image_size.width} ${data.image_size.height}`}
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                    // ✅ none으로 설정하여 부모 컨테이너(이미지 비율과 동일)에 완전히 늘려 맞춤
                    preserveAspectRatio="none"
                >
                    {data.lines.map((line) => {
                        const isFocused = !selectedLine || selectedLine === line.name;
                        const isSelected = selectedLine === line.name;

                        return (
                            <polyline
                                key={line.name}
                                points={line.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
                                fill="none"
                                stroke={isSelected ? "#ffffff" : `rgb(${line.color.join(',')})`}
                                strokeWidth={isSelected ? "16" : "6"}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    opacity: isVisible && isFocused ? 1 : 0.1,
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
        </div>
    );
};

export default PalmCanvas;