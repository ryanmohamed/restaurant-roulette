import type { ReviewResponseType } from '@/lib/YelpTypes';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any | null

type Error = {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) 
{
    const {
        query: { latitude, longitude },
        method,
    } = req;

    if (latitude == null || longitude == null) return res.status(400).json({ error: "Mising query paramters"});
    if (latitude == undefined || longitude == undefined) return res.status(400).json({ error: "Mising query paramters"});
    if (latitude == "" || longitude == "") return res.status(400).json({ error: "Mising query paramters"});

    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_GEOCODE_KEY}`;
        const response = await fetch(url, { method: "GET" });
        if (response.status !== 200) throw new Error("Failed to retrieve coordinate information.");
        const data = await response.json();
        if(data?.error_message || data?.status !== "OK") throw new Error(data.error_message);
        if(data?.results === null || data?.results === undefined || data.results?.length === 0) throw new Error("Did not find any results.");
        const closest = data.results[0];
        return res.status(200).json(closest);
    }  
    catch (error) {
        return res.status(400).json({ error: error });
    }

    console.log(latitude, longitude);
    return res.status(200).json( null );
}
