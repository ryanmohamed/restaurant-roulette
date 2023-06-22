import useLocationContext from '@/hooks/useLocationContext';
import React, { useState } from 'react';

export default function Landing() {
  const [ mealtime, setMealTime ] = useState<"breakfast" | "lunch" | "dinner">("dinner");
  const { location } = useLocationContext();
  return (
    <div className="centered w-full h-96 bg-stone-950 bg-gradient-to-b to-orange-950 from-red-700">
        <div className="centered flex-col">
            <h1 className="px-20 text-center text-5xl text-stone-100 ">Let's find some food in {location?.regionName ?? "the world"}.</h1>
            <a className="btn mt-4 text-2xl" href="#content">Get Started</a>
        </div>
    </div>
  );
}
