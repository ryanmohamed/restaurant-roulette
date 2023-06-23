import React from 'react';
import Controls from './Controls';
export default function SidePanel() {

  return (
    <div className="flex flex-col justify-between font-barlow md:h-full md:w-2/5 bg-stone-950 p-2 py-4 md:px-4 bt">
      <div>
        <h3 className="text-2xl text-stone-300 border-b-2 border-zinc-700 pb-1">Modify your search</h3>  
        <Controls />
      </div>
      <button className="btn font-barlow text-lg mt-8">Search restaurants</button>
    </div>
  );
}
