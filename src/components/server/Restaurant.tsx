import type { BusinessType, CategoryList, CategoryType, ReviewResponseType } from "@/lib/YelpTypes";
import SaveRestaurant from "../client/SaveRestaurant";
import Star from "../svgs/Star";
import Reviews from "./Reviews";
import ReviewsWireframe from "./ReviewsWireframe";

export default function Restaurant ({ restaurant, extras }: { restaurant: BusinessType, extras?: ReviewResponseType }) {
    return (
        <div className="w-full h-full flex flex-col justify-between">

            <div>
                <div className="flex items-end pb-1 border-b-2 border-stone-800">
                    <h2 className="capitalize w-4/5 font-semibold text-stone-950 text-3xl">{restaurant?.name}</h2>
                    <p className="flex justify-end items-end ml-2 w-1/5 font-barlow">XX-XX min</p>
                </div>

                <p className="font-poppins mt-2 text-right text-sm sm:text-md">{restaurant?.location?.address1}, {restaurant.location?.city}, {restaurant.location?.zip_code}</p>
            
                <div className="mt-2 sm:mt-6 flex flex-col sm:flex-row">
                    <div className="self-center mb-4 sm:mb-0 w-fit sm:max-w-[40%] h-fit rounded-2xl shadow-black shadow-md overflow-hidden sm:mr-4">
                        <img 
                            src={restaurant?.image_url || "http://placeholder.co/500/500"} 
                            alt="restaurant image" //todo: add restaurant specifc alt text
                            className="h-[200px] sm:h-[300px] w-auto object-cover saturate-150 brightness-90" 
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <div className="w-full flex sm:flex-col flex-row-reverse items-center h-8 sm:h-10 max-w-[400px] sm:max-w-full self-center sm:self-end">
                            <a href={restaurant?.url} rel="noreferrer" target="_blank" className="btn font-bold centered text-xs py-2 sm:text-sm text-center text-stone-100 h-full self-center sm:w-full">Order Now</a>
                            <div className="w-full h-full flex flex-row-reverse sm:flex-row items-center justify-between sm:self-end sm:mt-4">
                                <SaveRestaurant restaurant={restaurant}/>
                                <div className="w-full h-full flex items-center justify-end mr-2 sm:mr-0">
                                    { new Array(5).fill(0).map((e: number, key: number) => {
                                        const fill = key <= Math.floor(Number(restaurant.rating)) ? "rgb(245,158,11)" : "rgb(150,150,150)";
                                        const stroke = key <= Math.floor(Number(restaurant.rating)) ? "rgb(250,100,11)" : "rgb(100,100,50)";
                                        return <Star fill={fill} stroke={stroke} className="w-auto h-full mx-0.5" key={key}/>
                                    }) }
                                </div>
                            </div>
                        </div>

                        <div className="self-end flex flex-col items-end mt-4">
                            <h3 className="w-fit font-poppins font-semibold border-b-2 border-stone-800">Tags</h3>
                            <ul className="mt-2 flex flex-wrap">
                                { restaurant.categories.length > 0 && restaurant.categories.map((category: CategoryType) => (
                                    <li className="font-barlow mr-1 mb-1 w-fit p-1 px-2 rounded-2xl text-sm capitalize border-2 border-stone-800">{category.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            { extras ? <Reviews reviews={extras.reviews}/> : <ReviewsWireframe /> }

        </div>
    );
}