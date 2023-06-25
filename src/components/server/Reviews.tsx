import type { ReviewType } from "@/lib/YelpTypes";
import Link from "next/link";
import Star from "../svgs/Star";

export default function Reviews ({ reviews }: { reviews: ReviewType[]}) {
    return (
        <div className="w-full bg-reg-100 h-fit pt-2">
            <ul>
                { reviews?.map((review, key: number) => (
                    <li className="w-full flex items-start p-2 mx-2 mb-[20px] rounded-full border-2 border-stone-300" key={key}>
                        <Link href={review.user.profile_url} className="relative">
                            <div className="centered flex-col w-[60px] md:w-[100px] pl-2 mt-1 border-r-2 border-stone-300 pr-1"> 
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
                        <p className="ml-4 font-barlow text-sm text-stone-800 pr-4">{review.text}</p>
                        
                    </li>
                )) }
                
            </ul>
        </div>
    );
}