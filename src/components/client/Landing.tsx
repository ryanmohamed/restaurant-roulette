import useLocationContext from '@/hooks/useLocationContext';
import React, { useEffect, useState } from 'react';

const easterEggs = ["space", "the 4th dimension", "enough time to watch One Piece", "the world", "one of the hemispheres"];
const getEasterEgg = () => {
  const idx = Math.floor(Math.random() * easterEggs.length);
  return easterEggs[idx];
}

// fetch location data and render component on server side if location hasn't yet loaded 
export default function Landing() {
  const [ message, setMessage ] = useState<string>("space");
  const { loading, location } = useLocationContext();
  
  useEffect(() => {
    setMessage(getEasterEgg());
  }, []);
  
  return (
    <div className="centered w-full h-72 md:h-96 bg-stone-950 bg-gradient-to-br to-amber-800 from-red-800">
        <div className="centered flex-col flex-grow">
            <h1 className="px-20 font-bold font-poppins my-4 md:my-8 text-center text-4xl md:text-5xl text-stone-100">Let&apos;s find some food in {loading ? message : location ? location.regionName : message }.</h1>
            <a className="font-poppins w-fit centered btn text-xl md:text-2xl" href="#content">Get Started</a>
        </div>
    </div>
  );
}
