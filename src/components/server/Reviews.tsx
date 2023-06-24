import { ReviewResponseType, ReviewType } from "../client/Restaurant";

export default function Reviews ({ reviews }: { reviews: ReviewType[]}) {
    return (
        <div className="w-full bg-reg-100 h-fit">
            <ul>
                { reviews?.map((review, key: number) => (
                    <li className="flex items-start mb-2 p-2 rounded-2xl border-2 border-green-800" key={key}>
                        <div> 
                            <div className="h-10 w-10 overflow-hidden rounded-full">
                                <img className="object-cover w-full h-full" src={review?.user?.image_url || "https://placeholder.co/500/500"} alt="review profile picture" />
                            </div>
                            <p className="font-barlow text-xs text-center">{review.user?.name}</p>
                        </div>
                        <p className="ml-4 font-barlow font-sm">{review.text}</p>
                    </li>
                )) }
            </ul>
        </div>
    );
}