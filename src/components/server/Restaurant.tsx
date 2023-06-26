import type { BusinessType, CategoryList, CategoryType, ReviewResponseType } from "@/lib/YelpTypes";
import SaveRestaurant from "../client/SaveRestaurant";
import Star from "../svgs/Star";
import Reviews from "./Reviews";
import ReviewsWireframe from "./ReviewsWireframe";
import StarList from "./StarList";

export default function Restaurant ({ restaurant, extras }: { restaurant: BusinessType, extras?: ReviewResponseType }) {
    return (
        <div className="w-full h-full flex flex-col justify-between">

            <div>
                <div className="flex items-end pb-1 border-b-2 border-stone-800">
                    <h2 className="capitalize w-4/5 font-semibold text-stone-950 text-xl md:text-3xl">{restaurant?.name}</h2>
                    <p className="flex justify-end items-end ml-2 w-1/5 font-barlow">XX-XX min</p>
                </div>

                <p className="font-poppins mt-2 text-right text-sm sm:text-md">{restaurant?.location?.address1}, {restaurant.location?.city}, {restaurant.location?.zip_code}</p>
            
                <div className="mt-2 sm:mt-6 flex flex-col sm:flex-row">
                    <div className="self-center sm:mb-0 w-fit sm:max-w-[40%] h-fit rounded-2xl shadow-black shadow-md overflow-hidden sm:mr-4">
                        <img 
                            src={restaurant?.image_url || "http://placeholder.co/500/500"} 
                            alt="restaurant image" //todo: add restaurant specifc alt text
                            className="h-[200px] sm:h-[300px] w-auto object-cover saturate-150 brightness-90" 
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">

                        <div className="mt-4 mb-2 h-20 sm:h-36 grid place-items-center grid-rows-2 grid-cols-2 w-full self-center sm:self-end">
                            <div className="p-2 w-full h-full self-center sm:row-start-1 row-start-2 row-span-1 sm:col-span-2">
                                <a href={restaurant?.url} rel="noreferrer" target="_blank" className="btn h-full centered text-xs sm:text-sm font-bold text-center text-stone-100">Order Now</a>
                            </div>
                            <div className="row-start-2 w-full h-full p-2">
                                <SaveRestaurant restaurant={restaurant} className="h-full w-full" />
                            </div>
                            <div className="sm:col-span-1 sm:col-start-2 col-start-1 col-span-2 centered h-10">
                                <StarList stars={Number(restaurant.rating)} />
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