import useLocationContext from '@/hooks/useLocationContext';
import LoadingPage from '@/components/server/LoadingPage';
import ErrorElement from '@/components/server/ErrorElement';

export default function Home() {
  const { error, loading } = useLocationContext();

  if (error) {
    return ( 
      <ErrorElement message="Could not find your location automatically! Try setting it manually." />
    )
  }

  else if (loading) {
    return ( 
      <LoadingPage />
    )
  }

  return (
    <main className={`page`}>
      <></>
    </main>
  )
}
