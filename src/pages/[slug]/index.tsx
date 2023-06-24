import Carousel from '@/components/client/Carousel';
import ErrorElement from '@/components/server/ErrorElement';
import type { SearchResponseType } from '@/components/client/Restaurant';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
/*
    Always runs on server, removed from client side bundle! :D
*/
export const getServerSideProps: GetServerSideProps<{
  restaurants: SearchResponseType | null | any
}> = async (ctx) => {

  const { slug, searchTerms, lat, lon } = ctx.query;
  if (slug !== "restaurant") { 
    return { 
      props: { 
          restaurants: null 
      } 
    }
  }

  const URL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&term=${"food%20" + searchTerms}&attributes=restaurants_delivery&sort_by=best_match&limit=50`;

  //const restaurants = TestData;
  let restaurants = null;
  try {
    const response = await fetch(URL, { 
      method: "GET", 
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${process.env.YELP_API_KEY}`
      } 
    });
    restaurants = await response.json();
    console.log("REQUEST YELP API INFORMATION");
    //console.log("response\n", restaurants);
  }
  catch (error) {
    console.error("An error occured retrieving restaurant information.", error);
  }
  
  return { 
      props: { 
          restaurants 
      } 
  }
}
 
export default function Page ({
  restaurants,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  if (restaurants === null || restaurants === undefined) {
    return (
      <ErrorElement message="Error retrieving restaurant information." />
    );
  }

  else if (restaurants.total === 0 || restaurants.total === undefined || restaurants.total === null) { 
    return (
      <ErrorElement message="No restaurants found." />
    );
  }

  return (
    <main className={`page w-full flex flex-col p-4 box-border overflow-scroll bg-stone-100 text-black`}>
      { restaurants && <>
        <p>{restaurants.businesses.length} restaurants found.</p>
        <Carousel values={restaurants.businesses}/>
      </> }
    </main>
  );
};
