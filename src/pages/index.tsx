import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import useLocationContext from '@/hooks/useLocationContext';
import Spinner from '@/components/Spinner';

export default function Home() {
  const { error, loading } = useLocationContext();

  if (error) {
    return ( 
      <main className="page bg-stone-100 centered p-10">
        <h1 className="animate-pulse text-center text-stone-950">Could not find your location automatically! Try setting it manually.</h1>
      </main>
    )
  }

  else if (loading) {
    return ( 
      <main className="page centered">
        <Spinner />
      </main>
    )
  }

  return (
    <main className={`page`}>
      <p className="text-5xl font-bold text-stone-950">Dexter's Kitchen</p>
    </main>
  )
}
