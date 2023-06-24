import useCookie from "@/hooks/useCookie";
import { useEffect, useState } from "react";
import Restaurant, { BusinessType, ReviewResponseType } from "./Restaurant";

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
                const response = await fetch(`/api/restaurant/${restaurantId}`);
                const data: ReviewResponseType = await response.json();
                console.log(data);
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
        fetchSupplementalData(values[page]?.id);
    }, [page]);

    const nextPage = () => {
        if (page + 1 < values.length) setPage(page + 1);
    }
    const prevPage = () => {
        if (page - 1 >= 0) setPage(page - 1);
    }
    return (
        <div>
            <Restaurant restaurant={values[page]} extras={restaurantsData[values[page]?.id || ""]} />
            <button onClick={prevPage} className="btn text-white">Previous</button>
            <button onClick={nextPage} className="btn text-white">Next</button>
        </div>
    );
}