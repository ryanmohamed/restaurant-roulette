import useCookie from "@/hooks/useCookie";
import type { BusinessType, ReviewResponseType } from "@/lib/YelpTypes";
import { useEffect, useState } from "react";
import Restaurant from "../server/Restaurant";
import Caret from "../svgs/Caret";

const cache: { [key: string]: any } = {};

export default function Carousel ({ values }: { values: BusinessType[] }) {
    const [ page, setPage ] = useState<number>(0);
    const [ locationCookie ] = useCookie("x-restaurant-roulette-location");
    const [ restaurantsData, setRestaurantsData ] = useState<{ [key: string]: any }>({});
  
    // data is requested when needed for each individual restaurant
    // cache the results to avoid future API requests
    const fetchSupplementalData = async (restaurantId: string | null | undefined) => {
        if (restaurantId === null || restaurantId === undefined) return;
        if (locationCookie === null || locationCookie === undefined) return;
        try {
            if (cache[restaurantId]) {
                // If data is already in cache, use it
                setRestaurantsData((prevData) => ({
                    ...prevData,
                    [restaurantId]: cache[restaurantId],
                }));
            } else {
                // Fetch the supplemental data for the restaurant
                const response = await fetch(`/api/rating/${restaurantId}`);
                if (response.status !== 200) throw new Error("Failed to retrieve supplemental restaurant data.");
                const data: ReviewResponseType = await response.json();
                cache[restaurantId] = data; // Store the data in cache
                setRestaurantsData((prevData) => ({
                    ...prevData,
                    [restaurantId]: data,
                }));
            }
        } 
        catch (error) {
            console.log(error);
        }
    };

    /* 1 extra api call on mount, but neglible for now */
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        // cancel any previous requests and make a new one
        const delayRequest = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                fetchSupplementalData(values[page]?.id)
            }, 1500)
        }
        delayRequest();

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [page]);

    const nextPage = () => {
        if (page + 1 < values.length) setPage(page + 1);
    }
    const prevPage = () => {
        if (page - 1 >= 0) setPage(page - 1);
    }
    
    return (
        <div className="flex flex-col flex-grow justify-between">
            <Restaurant restaurant={values[page]} extras={restaurantsData[values[page]?.id || ""]} />
            <div className="centered h-20 mt-4">
                <div className="flex items-center border-2 w-fit border-stone-400 p-2 rounded-full">
                    <button onClick={prevPage} className="paginate"><Caret fill="white" className="rotate-180 w-10 md:w-16 h-10 md:h-16" /></button>
                    <p className="w-10 text-center centered text-lg text-stone-600 font-poppins">Page {page+1}/{values.length}</p>
                    <button onClick={nextPage} className="paginate"><Caret fill="white" className="w-10 md:w-16 h-10 md:h-16" /></button>
                </div>
            </div>
        </div>
    );
}