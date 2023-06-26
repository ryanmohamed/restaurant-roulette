import { BusinessType } from "@/lib/YelpTypes";
import { useEffect, useState } from "react";
import FavoriteBlock from "./FavoriteBlock";

export default function Favorites ({ show, close }: { show: boolean, close: CallableFunction }) {
    const [favorites, setFavorites] = useState<BusinessType[] | null>(null);
    if (typeof window === "undefined") <div></div>;
    const copySession = () => {
        const f = [];
        if (typeof window === "undefined") return;
        for(let i = 0; i < sessionStorage.length; i++) {
            console.log(sessionStorage.key(i))
            const restaurantID = sessionStorage.key(i);
            if (restaurantID?.startsWith("restaurant-roulette-")){
                const restaurant = sessionStorage.getItem(restaurantID);
                const restaurantData: BusinessType = JSON.parse(restaurant as string);
                f.push(restaurantData);
                setFavorites(f);
            }
        }
    }

    useEffect(() => {
        copySession();
        console.log("yo")
    }, []);

    // listen for changes to sessions storage
    useEffect(() => {
        window.addEventListener("storage", copySession);
        return () => window.removeEventListener("storage", copySession);
    }, []);


    return (
        <div className={`flex flex-col justify-between z-[98] absolute top-full translate-x-[${ show ? "0" : "100%"}] right-0 mt-[2px] screen-h w-72 bg-stone-950 transition`}>
            <div className="h-full overflow-y-scroll no-scrollbar ">
                { favorites?.map((favorite: BusinessType, idx: number) => (
                    <div key={idx}><FavoriteBlock restaurant={favorite}/></div>
                )) }
            </div>
            <div className="w-full p-4 centered">
                <button className="btn w-full font-bold bg-red-700 hover:bg-red-500" onClick={()=>close()}>Close</button>
            </div>
        </div>
    );
}