import React, { useState } from 'react';

export default function Landing() {
  const [ mealtime, setMealTime ] = useState<"breakfast" | "lunch" | "dinner">("dinner");
  const [ location, setLocation ] = useState<string>("Queens");
  return (
    <div className="centered w-full h-96 bg-stone-950 bg-no-repeat bg-cover bg-[url('/gradient.png')]">
        <div className="centered flex-col">
            <h1 className="px-10 text-center text-4xl text-stone-100 ">Let's find {mealtime} in {location}.</h1>
            <a className="btn mt-4 text-lg" href="#content">Get Started</a>
        </div>
    </div>
  );
}
