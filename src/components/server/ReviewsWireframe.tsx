const SingleReviewWireframe = () => {
    const getRandom = (a = 1, b = 5) => {
        return Math.floor(Math.random() * b) + a; 
    }
    return (
        <li className="flex p-2 mx-2">
            <div className="centered flex-col w-[60px] md:w-[100px] pl-2 mt-1 border-r-2 border-stone-300 transition group-hover:border-stone-400 pr-2"> 
                <div className="h-6 w-6 md:h-10 md:w-10 overflow-hidden rounded-full bg-stone-300"></div>
                <p className="mt-2 w-3/5 h-2 bg-stone-300"></p>
            </div>
            <div className="mx-8 flex-grow">
                <div className={`mb-2 w-full h-3 bg-stone-300`}></div>
                <div className={`mb-2 w-full h-3 bg-stone-300`}></div>
                <div className={`mb-2 w-${getRandom(1,4)}/5 h-3 bg-stone-300`}></div>
            </div>
        </li>
    );
}


export default function ReviewswWireframe() {
    return (
        <div className="flex flex-col w-full h-fit pt-2 mt-4">
            <h3 className="text-base mb-4 w-fit font-poppins font-semibold border-b-2 border-stone-800">Reviews</h3>
            <div className="animate-pulse">
                <div><SingleReviewWireframe /></div>
                <div className="hidden sm:block"><SingleReviewWireframe /></div>
                <div className="hidden sm:block"><SingleReviewWireframe /></div>
            </div>
        </div>
    );
}