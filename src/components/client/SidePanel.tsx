import useLocationContext from '@/hooks/useLocationContext';
import React, { useState } from 'react';
import FilterForm from './FilterForm';

export default function SidePanel() {
  const { location } = useLocationContext();
  const [ searchTerms, setSearchTerms ] = useState<string | null>(null);
  return (
    <div className="md:flex-grow flex flex-col font-barlow md:w-1/5 bg-stone-950 p-2 py-4 md:px-4 bt">
      <h3 className="text-2xl text-stone-300 border-b-2 border-zinc-700 pb-1">Modify your search</h3>  
      <FilterForm />
    </div>
  );
}
