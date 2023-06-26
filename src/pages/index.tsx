import useLocationContext from '@/hooks/useLocationContext';
import LoadingPage from '@/components/server/LoadingPage';
import ErrorElement from '@/components/server/ErrorElement';
import GoogleMap from '@/components/client/GoogleMap';
import Modal from '@/components/client/Modal';

const errorMessage = "An error occured retrieving restaurant information.";

export default function Home() {
  const { error, loading, showModal, setShowModal } = useLocationContext();

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
      
    </main>
  )
}


