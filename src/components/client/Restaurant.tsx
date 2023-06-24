import { useEffect } from "react";
import Reviews from "../server/Reviews";
import ReviewsWireframe from "../server/ReviewsWireframe";

export type ReviewUserType = {
    "id"?: string,
    "profile_url"?: string | string,
    "image_url"?: string | null,
    "name"?: string | null 
}

export type ReviewType = {
    "id"?: string,
    "url"?: string,
    "text"?: string,
    "rating"?: number,
    "time_created"?: string,
    "user"?: ReviewUserType
};

export type ReviewResponseType = {
    "reviews": ReviewType[],
    "total": number,
    "possible_languages"?: string[]
};

export type BusinessType = {
    "id"?: string;
    "alias"?: string;
    "name"?: string;
    "image_url"?: string;
    "is_closed"?: boolean;
    "url"?: string; 
    "review_count"?: number;
    "categories": {
        "alias"?: string;
        "title"?: string;
    }[];
    "rating"?: number;
    "coordinates"?: {
        "latitude"?: number;
        "longitude"?: number;
    };
    "transactions"?: string[];
    "price"?: string;
    "location"?: {
        "address1"?: string;
        "address2"?: string | null;
        "address3"?: string | null;
        "city"?: string;
        "zip_code"?: string;
        "country"?: string;
        "state"?: string;
        "display_address"?: string[];
    };
    "phone"?: string;
    "display_phone"?: string;
}

export type SearchResponseType = {
    "businesses": BusinessType[];
    "total": number
}

export default function Restaurant ({ restaurant, extras }: { restaurant: BusinessType, extras?: ReviewResponseType }) {
    const fetchBusiness = async () => {
        try {
            const response = await fetch('/api/restaurant');
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchBusiness();
    }, [restaurant])
    return (
        <div className="w-full min-h-[500px] relative border-2 border-stone-800 p-3">
            <div className="flex items-end pb-1 border-b-2 border-stone-800">
                <a className="w-4/5 font-semibold text-stone-950 text-3xl transition-colors hover:text-red-600" href={restaurant?.url} rel="noreferrer" target="_blank">{restaurant?.name}</a>
                <p className="flex justify-end items-end ml-2 w-1/5 font-barlow">XX-XX min</p>
            </div>

            <p className="mt-2 text-right">{restaurant?.location?.address1}, {restaurant.location?.city}, {restaurant.location?.zip_code}</p>

            <div className="mt-6 flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:w-2/5 max-h-[400px] md:max-h-auto rounded-md overflow-hidden md:mr-4 shadow-black shadow-md">
                    <img 
                        src={restaurant?.image_url || "http://placeholder.co/500/500"} 
                        alt="restaurant image" //todo: add restaurant specifc alt text
                        className="object-fit saturate-150 brightness-90" 
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <button className="btn text-stone-100 mb-4 h-10 w-full">Order Now</button>
                    <div className="flex flex-col flex-grow rounded-tl-2xl overflow-hidden">
                        <div className="mb-2 h-7 w-full bg-stone-400"></div>
                        <div className="mb-2 h-7 w-full bg-stone-400"></div>
                        <div className="mb-2 h-7 w-full bg-stone-400"></div>
                        <div className="mb-2 h-7 w-full bg-stone-400"></div>
                        <div className="mb-2 h-7 w-full bg-stone-400"></div>
                    </div>
                </div>
            </div>

        { extras ? <Reviews reviews={extras.reviews}/> : <ReviewsWireframe /> }

        </div>
    );
}