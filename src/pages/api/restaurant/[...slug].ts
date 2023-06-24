import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

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

    const { slug } = req.query;
    if (slug?.length !== 1) return res.status(400).json({ error: 'Missing restaurant id.' });
    const id = slug[0];
    const url = `https://api.yelp.com/v3/businesses/${id}`;

    try {
        const response = await fetch(url, { 
        method: "GET", 
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.YELP_API_KEY}`
        } 
        });
        console.log("REQUESTING EXTRA FROM YELP API");
        const restaurants = await response.json();
        return res.status(200).json({ name: restaurants });
    }
    catch (error) {
        console.error("An error occured retrieving restaurant information.", error);
        return res.status(500).json({ error: "Error retrieving supplementary information." });
    }

    console.log(slug);
    return res.status(200).json({ name: `${slug}` })
}
