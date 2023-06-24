import Link from "next/link";

export default function Nav ({ ...props }) {
    return (
        <nav {...props} className="z-[100] fixed top-0 left-0 px-4 sm:px-10 md:px-20 flex items-center justify-between w-full h-14 bg-zinc-950 border-b-2 border-stone-800">
            <div><h1 className="text-stone-100 text-lg md:text-2xl font-bold">Restaurant Roulette🍴</h1></div>
            <ul className="flex text-base md:text-lg text-stone-300 font-poppins">
                <li className="mr-4 transition hover:text-red-500"><Link href="/"><span>Home</span></Link></li>
                <li className="transition hover:text-red-500"><button><span>Favorites</span></button></li>
            </ul>
        </nav>
    );
}