import Carousel from '@/components/client/Carousel';
import ErrorElement from '@/components/server/ErrorElement';
import type { ErrorResponseType, SearchResponseType } from '@/lib/YelpTypes';
import TestData from '@/testdata';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import React from "react";

const errorMessage = "An error occured retrieving restaurant information.";

/*
    Always runs on server, removed from client side bundle! :D
*/
export const getServerSideProps: GetServerSideProps<{
  restaurants: SearchResponseType | null | any
}> = async (ctx) => {

  const { latitude, longitude, term } = ctx.query;
  // pass query parameters to api
  const queryParameters = ctx.resolvedUrl.split("?")[1]
  console.log(queryParameters);
  const URL = `https://api.yelp.com/v3/businesses/search?${queryParameters}`;

  //const restaurants = TestData;
  let restaurants: SearchResponseType | ErrorResponseType | null = TestData;

  try {
    const response = await fetch(URL, { 
      method: "GET", 
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${process.env.YELP_API_KEY}`
      } 
    });
    restaurants = await response.json();
    if (response.status !== 200) throw new Error();
    console.log("REQUESTED YELP API INFORMATION");
  }
  catch (error) {
    console.error(errorMessage, error);
  }
  
  return { props: { restaurants } }
}
 
export default function Page ({
  restaurants,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  if (restaurants === null || restaurants === undefined) {
    return (
      <ErrorElement message={errorMessage} />
    );
  }

  else if (restaurants.total === 0 || restaurants.total === undefined || restaurants.total === null) { 
    return (
      <ErrorElement message="No restaurants found." />
    );
  }

  return (
    <main className={`page h-fit md:screen-h w-full box-border bg-stone-100 text-black`}>
      { restaurants && <>
        <Carousel values={restaurants.businesses}/>
      </> }
    </main>
  );
};
