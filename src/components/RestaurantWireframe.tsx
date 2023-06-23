import Spinner from "./Spinner";

export default function RestaurantWireframe () {
    return (
        <div className="w-full h-full relative">
            <Spinner />
            <div className="animate-pulse opacity-25">
                <div className="flex items-end">
                    <h1 className="h-14 w-4/5 rounded-t-2xl bg-stone-600"></h1>
                    <p className="ml-2 h-[27px] w-1/5 rounded-t-2xl bg-stone-500"></p>
                </div>
                <div className="mt-6 flex">
                    <div className="mr-4 h-64 w-64 md:h-72 md:w-72 rounded-sm bg-stone-500"></div>
                    <div className="flex flex-col flex-grow">
                        <div className="mb-4 h-10 w-full rounded-2xl bg-green-300"></div>
                        <div className="flex flex-col flex-grow rounded-tl-2xl overflow-hidden">
                            <div className="mb-2 h-7 w-full bg-stone-400"></div>
                            <div className="mb-2 h-7 w-full bg-stone-400"></div>
                            <div className="mb-2 h-7 w-full bg-stone-400"></div>
                            <div className="mb-2 h-7 w-full bg-stone-400"></div>
                            <div className="mb-2 h-7 w-full bg-stone-400"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}