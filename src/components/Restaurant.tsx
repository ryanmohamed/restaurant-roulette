import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
type Restaurants = any
 
/*
    Always runs on server, removed from client side bundle! :D
*/
export const getStaticProps: GetStaticProps<{
  restaurants: Restaurants
}> = async () => {
    
    const searchTerms = "";
    const lat = 40.686829;
    const lon = -73.819768;
    const URL = `https://api.yelp.com/v3/businesses/search?term=${searchTerms}&latitude=${lat}&longitude=-${lon}`;


    //const restaurants = null;
    const response = await fetch(URL, { 
        method: "GET", 
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.YELP_API_KEY}`
        } 
    });

    const restaurants = await response.json();
    console.log("Response", restaurants)

    return { 
        props: { 
            restaurants 
        } 
    }
}
 
export default function Page ({
    restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <pre>{JSON.stringify(restaurants)}</pre>
        </>
    );
}