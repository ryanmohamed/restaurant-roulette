import useLocationContext from '@/hooks/useLocationContext';
import React from 'react';

export default function SidePanel() {
  const { location } = useLocationContext();
  return (
    <div className="md:h-full md:w-2/5 bg-stone-950 p-2 py-4 bt">
      <h3 className="font-barlow text-2xl text-stone-300 border-b-2 border-zinc-700 pb-1">Modify your search</h3>
    
      <div>
        <div className="flex flex-col text-sm mt-4">
          <p className="flex justify-between text-right"><b>Location:</b> <span>{location ? `${location.city}, ${location.regionName}, ${location.zip}` : "Montreal, Quebec, H3H"}</span></p>
          <button className="self-end w-fit text-red-500 text-sm cursor-pointer">Change location</button>
        </div>
      </div>
    
    </div>
  );
}
