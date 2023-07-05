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
        query: { o_latitude, o_longitude, d_latitude, d_longitude  },
        method,
    } = req;

    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${o_latitude},${o_longitude}&destinations=${d_latitude},${d_longitude}&traffic_model=pessimistic&key=${process.env.DISTANCE_MATRIX_KEY}`
    try {
        console.log("before server side fetch");
        const response = await fetch(url, { method: "GET" });
        if (response.status !== 200) throw new Error("Failed to retrieve distance information.");
        console.log("before server side data json parse");
        const data = await response.json();
        console.log(data)
        console.log("before rows is known to be an array");
        if(data?.rows === undefined || data?.rows === null || typeof data.rows?.length !== "number" || data.rows.length === 0) throw new Error("Failed to retrieve distance information.");
      
        console.log("before elements is defined");
        const { elements } = data.rows[0];
        if(elements === null || elements === undefined || typeof elements?.length !== "number" || elements.length === 0) throw new Error("Failed to retrieve distance information");

        console.log("before distanceData is defined");
        const distanceData = elements[0];
        const { distance, duration, duration_in_traffic, origin, destination, status } = distanceData;
        console.log("before traffic is defined");
        if (duration === undefined || duration === null) throw new Error("Failed to retrieve distance information");
        let newDuration = duration;

        if (duration_in_traffic !== undefined && duration_in_traffic === null) {
          const seconds = (duration?.value || 0) + (duration_in_traffic?.value || 0);
          const hours = Math.floor(seconds / 3600);
          const remainingMinutes = Math.floor((seconds % 3600) / 60)
  
          console.log("before new text is defined");
          const newText = `${hours > 0 ? hours+"h" : ""}${remainingMinutes} mins`
          newDuration = {
              text: newText,
              value: seconds
          }
        }
    
        //return res.status(400).json({ error: "Failed to retrieve distance information from Distance Matrix API." });
        return res.status(200).json( { distance, duration: newDuration } );
    }

    catch (error) {
        return res.status(400).json({ error: "Failed to retrieve distance information from Distance Matrix API." });
    }
}
