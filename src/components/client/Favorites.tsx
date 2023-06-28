import { BusinessType } from "@/lib/YelpTypes";
import { useEffect, useState } from "react";
import FavoriteBlock from "./FavoriteBlock";

export default function Favorites ({ show, close }: { show: boolean, close: CallableFunction }) {
    const [favorites, setFavorites] = useState<BusinessType[] | null>(null);
    if (typeof window === "undefined") <div></div>;
    const copySession = () => {
        const f = [];
        if (typeof window === "undefined") return;
        if(sessionStorage?.length === 0) setFavorites([]);
        for(let i = 0; i < sessionStorage.length; i++) {
            const restaurantID = sessionStorage.key(i);
            if (restaurantID?.startsWith("restaurant-roulette-")){
                const restaurant = sessionStorage.getItem(restaurantID);
                const restaurantData: BusinessType = JSON.parse(restaurant as string);
                f.push(restaurantData);
                setFavorites(f);
                console.log(f);
            }
        }
    }

    useEffect(() => {
        copySession();
    }, []);

    useEffect(() => {
        copySession();
    }, [show]);

    // listen for changes to sessions storage
    useEffect(() => {
        window.addEventListener("storage", copySession);
        return () => window.removeEventListener("storage", copySession);
    }, []);


    return (
        <div className={`flex flex-col z-[98] absolute top-full right-0 mt-[2px] screen-h w-full sm:w-72 bg-stone-950 transition`} style={{ transform: `translateX(${show ? 0 : 100}%)`}}>
            <div className="w-full p-4 centered">
                <button className="btn w-full font-bold bg-red-700 hover:bg-red-500" onClick={()=>close()}>Close</button>
            </div>
            <div className="h-full overflow-y-scroll no-scrollbar">
                { favorites?.map((favorite: BusinessType, idx: number) => (
                    <div key={idx}><FavoriteBlock restaurant={favorite}/></div>
                )) }
            </div>
        </div>
    );
}