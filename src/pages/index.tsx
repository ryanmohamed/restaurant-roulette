import useLocationContext from '@/hooks/useLocationContext';
import RestaurantWireframe from '@/components/RestaurantWireframe';
import Restaurant from '@/components/Restaurant';

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
        <RestaurantWireframe />
      </main>
    )
  }

  return (
    <main className={`page`}>
      <Restaurant />
    </main>
  )
}
