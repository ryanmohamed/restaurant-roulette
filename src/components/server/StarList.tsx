import Star from "../svgs/Star";

export default function StarList ({ stars, className }: { stars: number, className?: string }) {
    return (
        <div className={`w-full h-full flex items-center justify-end mr-2 sm:mr-0 ${className}`}>
            { new Array(5).fill(0).map((e: number, key: number) => {
                const fill = key <= Math.floor(stars) ? "rgb(245,158,11)" : "rgb(150,150,150)";
                const stroke = key <= Math.floor(stars) ? "rgb(250,100,11)" : "rgb(100,100,50)";
                return <Star fill={fill} stroke={stroke} className="w-auto h-full mx-0.5" key={key}/>
            }) }
        </div>
    );
}