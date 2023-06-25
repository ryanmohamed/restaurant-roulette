export default function Caret ({ fill, className }: { fill: string, className: string }) {
    return (
        <svg className={className} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Arrow / Caret_Right_SM">
            <path id="Vector" d="M11 9L14 12L11 15" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    );
}

