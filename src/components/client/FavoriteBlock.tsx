import { BusinessType } from "@/lib/YelpTypes";
import Star from "../svgs/Star";

export default function FavoriteBlock ({ restaurant }: { restaurant: BusinessType}) {
    return (
        <div className="flex flex-col items-center m-4 p-4 border-2 border-red-700 rounded-2xl">
            <div className="flex items-end justify-between border-b-2 border-stone-800 w-full pb-1 mb-2 ">
                <h4 className="font-poppins font-semibold">{restaurant.name}</h4>
                <div className="w-full h-4 flex items-center justify-end mr-2 sm:mr-0">
                    { new Array(5).fill(0).map((e: number, key: number) => {
                        const fill = key <= Math.floor(Number(restaurant.rating)) ? "rgb(245,158,11)" : "rgb(150,150,150)";
                        const stroke = key <= Math.floor(Number(restaurant.rating)) ? "rgb(250,100,11)" : "rgb(100,100,50)";
                        return <Star fill={fill} stroke={stroke} className="w-auto h-full mx-0.5" key={key}/>
                    }) }
                </div>
            </div>
            <div className="self-center">
            {/* eslint-disable */ 
                <img 
                    src={restaurant?.image_url || "http://placeholder.co/500/500"} 
                    alt="restaurant image" //todo: add restaurant specifc alt text
                    className="h-[200px] sm:h-[300px] w-auto object-cover saturate-150 brightness-90" 
                />
            /* eslint-enable */ 
            }
            </div>
        </div>
    );
}