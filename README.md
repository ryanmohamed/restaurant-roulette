This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Restaurant Roulette
Stuck on what to order? Use Restaurant Roulette for a quick recommendation based on your area's local reviews.

## Getting Started

Install dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes 

Client-side API requests. 
1. `ipify` public API is used in our case for simple, and unlimited retrieval of client IPs. (As opposed to extracting client IP from requests to the web server. This method is more robust and utilizes the services provided by `ipify`)
2. `ip-api` public API is a great alternative to paid IP serives. All we need is latitude and longitude (for future location based API calls), however `ip-api` provides some extra data for zero cost and with zero limitation. 

Server-side API requests. 
1. `yelp` public API provides the basis of our restuarant data with location directly influencing it. However it's use is limited and authenticated with an API key. This communication should be kept away from the client entirely to ensure no requests to `yelp` in ill intent. 
   1. Client requests restaurants from Server. 
   2. Server requests `yelp` API. 
   3. Server parses and returns cleaned restuarant data as response to Client. 
   4. Client renders data as props on Page. 

API Request Optimizations.
1. `yelp`
   Naturally the free tier of the `yelp` API employs a daily 500 request limit. 
   We are mainly performing 2 kinds of API requests to the `yelp` API. 
      1. > **Initial search request** (SSR): yields a `SearchResponseType` JSON object with an array of `BusinessType` objects. The provides enough data to render business information on the server side and send it to the client. *1 request per search*.
      2. > **Supplemental Information Request**: (Proxied API request): Because the client renders one "page" of information from some `BusinessType[]` in a component at a time, we need only request the current business's supplemental information. *1 request per `next page` click*.
         1. Because we are requesting whenever the component's `page` state changes, we need to consider when we navigate backwards with `prev page` clicks. 
            - > **Solution**: Check for cached restaurant data before making request on state change. 
         2. Any user would naturally rapidly click through the `next page` button causing a ton of requests from our server to `yelp`. 
            - > **Solution**: Delay/debounce the API request by `n` milliseconds and clear any previous requests that were waiting to be made. Requests are only made when the component has "sat" for `n` milliseconds.

Further Considerations.
1. When we perform our search we gather top-level information about many restaurants.
2. We have the data both server side and client side, but only need to render one restaurant at a time.
3. Each restaurant should asynchronously fetch supplementary information about itself like reviews, menu items, etc. We do not want to fetch supplementary information all at once, only fetch when needed.
4. Since our application uses one mounted component with some restaurant data state, we only need to fetch the data when the state is changed. However an issue lies in refetching data when we navigate to restaurants we've already seen, **cache** the supplementary information and only retrieve the data from API for newly seen Restaurants.
5. After performing a search, the user has the ability to navigate through 

## Thought Process

Before we start requesting from the Yelp API, whether that be directly on the client-side or proxied through the server, we need the user's **location**. 

Many APIs provide this service. Our main concern is how do we manage this data? Some points: 

It's client specific information so we can maintain some latititude and longitude state in React Context. 
Since location can be found with some great free APIs we'll keep that logic neatly coupled client side.

Yelp requires our application API Key, so we'll use the web app's server as a proxy when retrieving data. This also aids in keeping our dynamic routes rendered on the server side. 

## To Do

- [x] Store client inital location information as cookies.
- [ ] Add ability to change location.
- [ ] Update cookies with client edited location information.
- [x] Add middleware that redirects back to homepage when client lacks location cookie information. 
- [ ] Add `getStaticProps` and `getStaticPaths` to root `/` route. Retrieve default data from either `yelp` or server side cache. 
- [ ] Investigate the extra API calls being made for individual `Restaurant` components for supplemental information.
- [ ] Refactor codebase.

## Vulnerabilities
1. A recently found vulnerability stemming from `semver`. Since this is a small project I will overlook this since it's a recently posted issue found [here.](https://github.com/advisories/GHSA-c2qf-rxjj-qqgw)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).
