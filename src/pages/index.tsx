import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';


export default function Home() {
  return (
    <main className={`box-border p-4 w-full h-full bg-stone-100 flex flex-col`}>
      <p className="text-5xl font-bold text-stone-950">Dexter's Kitchen</p>
    </main>
  )
}
