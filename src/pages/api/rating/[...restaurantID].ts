import type { ReviewResponseType } from '@/lib/YelpTypes';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = ReviewResponseType | null

type Error = {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) 
{
    const locationCookie = req.cookies["x-restaurant-roulette-location"];
    if (locationCookie === null || locationCookie === undefined) 
        return res.status(400).json({ error: 'Request does not have location cookies' });

    const { restaurantID } = req.query;
    if (restaurantID?.length !== 1) return res.status(400).json({ error: 'Missing restaurant id.' });
    const id = restaurantID[0];
    const url = `https://api.yelp.com/v3/businesses/${id}/reviews?sort_by_yelp_sort`;

    try {
        const response = await fetch(url, { 
        method: "GET", 
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.YELP_API_KEY}`
        } 
        });
        if (response.status !== 200) throw new Error();
        const restaurants: ReviewResponseType = await response.json();
        console.log("REQUESTED EXTRA DATA FROM YELP API");
        return res.status(200).json( restaurants );
    }
    catch (error) {
        console.error("An error occured retrieving restaurant information.", error);
        return res.status(500).json({ error: "Error retrieving supplementary information." });
    }
}
