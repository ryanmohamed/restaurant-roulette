import Link from "next/link";

export default function Footer ({}) {
    return (
        <footer className="w-full min-h-[300px] bg-stone-950 bt p-6">
            <div className="flex justify-end w-full"><h2 className="text-4xl font-poppins font-bold text-stone-500 border-b-2 border-stone-800 w-fit">Restaurant Roulette</h2></div>
            <div className="text-center font-barlow text-base text-stone-400 p-4 py-8">
                <p className="mb-6 border-2 border-stone-800 md:border-none md:p-0 p-2 rounded-2xl">Restaurant Roulette is a simple web app target towards providing user's with accurate and customizeable restaurant data. Apps like Uber, DoorDash, and Seamless seem to always show the same results. Most experiences are also tailored towards mobile apps with wep pages left as a support page.</p>
                <p className="mb-6 border-2 border-stone-800 md:border-none md:p-0 p-2 rounded-2xl">Restaurant Roulette aims to quickly serve users information about restaurants in their area and location preferences, with a focus on simplicity and analyzing one restaurant at a time. Less is more!</p>
                <p className="border-2 border-stone-800 md:border-none md:p-0 p-2 rounded-2xl">Customize your search, save your favorites, and come back to an even faster working wep app!</p>
            </div>
            <div className="mt-4 flex justify-center w-full"><h3 className="text-2xl font-poppins font-bold text-stone-600 border-b-2 border-stone-800 w-fit">Some Of My Other Projects</h3></div>
            <ul className="mt-4 w-full flex flex-wrap">
                <li className="w-1/3 p-2"><Link className="h-full font-poppins font-semibold text-stone-400 transition hover:text-red-700 hover:border-red-700 rounded-full centered text-center px-3 py-2 border-2 border-stone-900" href="https://github.com/ryanmohamed/stripe-openai-socket-generation" rel="noreferrer" target="_blank">Petmatcher v2</Link></li>
                <li className="w-1/3 p-2"><Link className="h-full font-poppins font-semibold text-stone-400 transition hover:text-purple-700 hover:border-purple-700 rounded-full centered text-center px-3 py-2 border-2 border-stone-900" href="https://quizitiv.netlify.app" rel="noreferrer" target="_blank">Quizitiv</Link></li>
                <li className="w-1/3 p-2"><Link className="h-full font-poppins font-semibold text-stone-400 transition hover:text-green-700 hover:border-green-700 rounded-full centered text-center px-3 py-2 border-2 border-stone-900" href="https://github.com/ryanmohamed" rel="noreferrer" target="_blank">GitHub</Link></li>
            </ul>
        </footer>
    );
}