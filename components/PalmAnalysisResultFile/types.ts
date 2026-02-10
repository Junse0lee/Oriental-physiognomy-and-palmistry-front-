//같은 타입들을 공유하기 때문에 같은 타입을 묶어서 수행
// src/components/analysis/types.ts
export interface LineData {
    name: string;
    label: string;
    color: [number, number, number];
    points: [number, number][];
}

export interface ImageSize {
    width: number;
    height: number;
}

export interface AnalysisData {
    lines: LineData[];
    mounts: Record<string, [number, number]>;
    report: string;
    image_size: ImageSize;
}

export interface AnalysisProps {
    data: AnalysisData;
    imageUrl: string;
}