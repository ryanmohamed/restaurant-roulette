import TestData from '@/testdata.js';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Restaurants = {
  businesses: ({
      id: string;
      alias: string;
      name: string;
      image_url: string;
      is_closed: boolean;
      url: string;
      review_count: number;
      categories: {
          alias: string;
          title: string;
      }[];
      rating: number;
      coordinates: any;
      price?: undefined;
    }),
    total: number;
    region: any;
} | any
 
/*
    Always runs on server, removed from client side bundle! :D
*/
export const getServerSideProps: GetServerSideProps<{
  restaurants: Restaurants
}> = async (ctx) => {

  const { slug, searchTerms, lat, lon } = ctx.query;
  if (slug !== "restaurant") { 
    return { 
      props: { 
          restaurants: null 
      } 
    }
  }

  const URL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;

  //const restaurants = TestData;
  const response = await fetch(URL, { 
      method: "GET", 
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${process.env.YELP_API_KEY}`
      } 
  });
  const restaurants = await response.json();
  console.log("Response", JSON.stringify(restaurants))

  return { 
      props: { 
          restaurants 
      } 
  }
}
 
export default function Page ({
    restaurants,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <main className={`box-border text-black p-4 w-full h-full bg-stone-100 flex flex-col overflow-scroll`}>
        <p>{restaurants.total} restaurants found.</p>
        { restaurants.businesses?.map((business: any) => (
          <div className="mb-4 font-poppins">
            <a className="text-2xl font-semibold" href={business.url} rel="noreferrer" target="_blank">{business.name}</a>
            <p>{business?.location?.address1}</p>
            <img className="max-w-[200px] h-auto" src={business.image_url} />
          </div>
        )) }
      </main>
    );
};
