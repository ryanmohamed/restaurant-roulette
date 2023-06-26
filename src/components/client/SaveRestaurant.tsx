"use client"
import useSessionStorage from "@/hooks/useSessionStorage";
import { BusinessType } from "@/lib/YelpTypes";
import { MouseEventHandler, useEffect, useState } from "react";

export default function SaveRestaurant ({ restaurant }: { restaurant: BusinessType}) {
    const [ toggle, setToggle ] = useState<boolean>(true);
    const handleSave: MouseEventHandler = (event) => {
        event.preventDefault();
        if(typeof window === "undefined") return;
        const restaurantID = restaurant.id;
        if (toggle) window.sessionStorage.setItem("restaurant-roulette-" + restaurantID, JSON.stringify(restaurant));
        else window.sessionStorage.removeItem("restaurant-roulette-" + restaurantID);
        setToggle(!toggle);
        window.dispatchEvent(new Event("storage")); // rerender favorites
    }
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        setToggle(sessionStorage.getItem("restaurant-roulette-" + restaurant.id) === null ? true : false);
    }, [restaurant])

    return (
        <button onClick={handleSave} className="btn font-bold h-full mr-2 sm:mr-0 py-2 text-xs centered bg-red-700 hover:bg-red-500 text-stone-300">
            { toggle ? "Add to favorites" : "Remove from favorites" }
        </button>
    );
}