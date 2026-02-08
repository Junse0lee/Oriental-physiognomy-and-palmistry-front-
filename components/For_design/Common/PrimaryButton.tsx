import React from "react";

//1. 이 버튼을 쓸 때 넘겨줘야 할 데이터 정의
interface PrimaryButtonProps {
    label: string; //버튼에 들어갈 글자
    onClick: () => void;  //클릭 시 실행할 함수
    className?: string; //혹시 추가로 디자인을 바꾸고 싶을 때를 대비
}

export default function PrimaryButton({label, onClick, className}: PrimaryButtonProps){
    return (
        <button 
        onClick = {onClick}
        //기존 디자인 코드를 그대로 가져오고, 추가 스타일 (className)이 들어오면 뒤에 붙여줍니다.
        className ={`px-10 py-4 bg-[#E2C37B] text-black font-bold rounded-full hover:bg-[#d4b66a] transition-colors ${className}`}
        >
        {label}
        </button>
    );
}