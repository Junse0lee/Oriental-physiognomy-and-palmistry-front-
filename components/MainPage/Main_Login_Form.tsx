// 1. [Include 단계] 필요한 도구 가져오기
import React from "react";

// 2. [Interface 단계] 이 방(컴포넌트)을 쓰기 위해 필요한 규칙 정의
interface Props {
    onNext: () => void; //"나를 부를 때 onNext라는 함수를 꼭 넘겨줘"라는 뜻입니다.
}

// 3. [Main 함수 단계] 실제 화면을 그리는 함수
// export default는 "이 파일을 다른 데서 쓸 수 있게 내보낸다"는 뜻입니다.
export default function Main_Login_Form({ onNext }: Props) {
  
  // 4. [Return 단계] 화면에 보여줄 HTML 구조 (도화지에 그림 그리기)
  return (
    <div className="flex flex-col items-center space-y-10">
      
      {/* 이미지에서 본 눈 모양 아이콘과 텍스트가 들어갈 자리 */}
      <div className="text-center space-y-4">
        <div className="text-6xl">👁️</div> {/* 임시 아이콘 */}
        <p className="text-[#E2C37B] text-xl">당신의 미래가 보입니다</p>
      </div>

      {/* 5. [Event 단계] 클릭 시 다음 장면으로 넘겨주는 버튼 */}
      <button 
        onClick={onNext} // 부모(page.tsx)가 준 함수를 실행!
        className="px-10 py-4 bg-[#E2C37B] text-black font-bold rounded-full"
      >
        운명 확인하기
      </button>

    </div>
  );
}