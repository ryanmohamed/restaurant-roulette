import Link from "next/link";
import { useState } from "react";
import Favorites from "./Favorites";

export default function Nav ({ ...props }) {
    const [ showFavorites, setShowFavorites ] = useState<boolean>(false);
    return (
        <nav {...props} className="z-[100] fixed top-0 left-0 px-4 sm:px-10 md:px-20 flex items-center justify-between w-full h-14 bg-zinc-950 border-b-2 border-stone-800">
            <div><h1 className="text-stone-100 text-sm sm:text-lg md:text-2xl font-bold">Restaurant Roulette🍴</h1></div>
            <ul className="flex text-sm sm:text-base md:text-lg text-stone-300 font-poppins">
                <li className="mr-1 md:mr-4 transition hover:text-red-500"><Link href="/"><span className="hidden md:block">Home</span><span className="block md:hidden p-1 sm:p-2 border-[2px] bg-gradient-to-r from-black to-red-950 border-red-800 rounded-full">🏡</span></Link></li>
                <li className="transition hover:text-red-500"><button onClick={() => setShowFavorites(!showFavorites)}><span className="hidden md:block">Favorites</span><span className="block md:hidden p-1 sm:p-2 border-[2px] bg-gradient-to-r from-black to-red-950 border-red-800 rounded-full text-center cursor-vertical-text">❤️</span></button></li>
            </ul>
            <Favorites show={showFavorites} close={()=>setShowFavorites(false)} />
        </nav>
    );
}