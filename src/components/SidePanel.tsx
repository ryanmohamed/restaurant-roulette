import useLocationContext from '@/hooks/useLocationContext';
import Link from 'next/link';
import React from 'react';
import Controls from './Controls';
export default function SidePanel() {
  const { location } = useLocationContext();
  return (
    <div className="flex flex-col justify-between font-barlow md:h-full md:w-2/5 bg-stone-950 p-2 py-4 md:px-4 bt">
      <div>
        <h3 className="text-2xl text-stone-300 border-b-2 border-zinc-700 pb-1">Modify your search</h3>  
        <Controls />
      </div>
      <Link href={`/restaurant?lat=${location?.lat}&lon=${location?.lon}`}><p className="btn font-barlow text-lg centered mt-8">Search restaurants</p></Link>
    </div>
  );
}
