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

## Thought Process

Before we start requesting from the Yelp API, whether that be directly on the client-side or proxied through the server, we need the user's **location**. 

Many APIs provide this service. Our main concern is how do we manage this data? Some points: 

It's client specific information so we can maintain some latititude and longitude state in React Context. 
Since location can be found with some great free APIs we'll keep that logic neatly coupled client side.

Yelp requires our application API Key, so we'll use the web app's server as a proxy when retrieving data. This also aids in keeping our dynamic routes rendered on the server side. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).
