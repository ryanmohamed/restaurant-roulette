import type { ReviewType } from "@/lib/YelpTypes";
import Link from "next/link";
import Star from "../svgs/Star";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Reviews ({ reviews }: { reviews: ReviewType[]}) {
    const reviewElements = getElements(reviews);
    return (
        <div className="flex flex-col w-full h-fit pt-2 mt-4">
            <h3 className="text-base mb-4 w-fit font-poppins font-semibold border-b-2 border-stone-800">Reviews</h3>
            <Carousel className="sm:hidden cursor-pointer" emulateTouch={true} autoPlay={true} infiniteLoop={true} useKeyboardArrows={true} showThumbs={false} showStatus={false} showIndicators={false} showArrows={false}>
                {reviewElements}
            </Carousel> 
            <div className="sm:block hidden">{reviewElements}</div>
        </div>
    );
}

function getElements (reviews: ReviewType[]) {
    return reviews?.map((review, key: number) => (
        <div className={`flex items-start justify-center ${key % 2 === 0 ? "" : ""}`} key={key}>
            <SingleReview review={review}/>
        </div>    
    ));
}

function SingleReview ({ review }: { review: ReviewType }) {
    return (
        <div className="h-20 max-h-[5rem] w-full flex items-start p-2 mx-2 mb-[20px] rounded-full border-2 border-stone-300 transition cursor-pointer hover:border-stone-400 group">
            <Link href={review.user.profile_url} className="relative">
                <div className="centered flex-col w-[60px] md:w-[100px] pl-2 mt-1 border-r-2 border-stone-300 transition group-hover:border-stone-400 pr-2"> 
                    <div className="h-6 w-6 md:h-10 md:w-10 overflow-hidden rounded-full">
                        <img className="object-cover w-full h-full" src={review?.user?.image_url || "https://placeholder.co/500/500"} alt="review profile picture" />
                    </div>
                    <p className="font-barlow text-[11px] text-center text-stone-700">{review.user?.name}</p>
                </div>
                <div className="z-[99] absolute top-ful left-1/2 translate-x-[-50%] flex bg-orange-200 py-0.5 px-2 rounded-2xl border-2 border-amber-600 shadow-orange-700 shadow-md">
                    { new Array(review.rating).fill(0).map((star: any, key: number) => (
                        <Star fill="rgb(245,158,11)" stroke="rgb(245,100,11)" className="w-2 h-2 md:w-3 md:h-3 mx-0.5" key={key}/>
                    ))}
                </div>
            </Link>
            <p className="h-full no-scrollbar overflow-y-scroll ml-4 font-barlow text-sm text-stone-800 pr-4 self-center">{review.text}</p>
        </div>
    );
}