import useLocationContext from '@/hooks/useLocationContext';
import LoadingPage from '@/components/server/LoadingPage';
import ErrorElement from '@/components/server/ErrorElement';
import FedUpImage from "../../public/fedup.png"
import DiscontentImage from "../../public/discontent.png"
import HeartImage from "../../public/heart.png";
import TastyImage from "../../public/tasty.png";
import GlassImage from "../../public/glass.png";
import Image from 'next/image';

const errorMessage = "An error occured retrieving restaurant information.";

export default function Home() {
  const { error, loading, showModal, setShowModal } = useLocationContext();

  if (error) {
    return ( 
      <ErrorElement message="Could not find your location automatically! (You may have to allow location permissions in your browser." />
    )
  }

  else if (loading) {
    return ( 
      <LoadingPage />
    )
  }

  return (
    <main className={`page grid grid-cols-3 items-center bg-cover bg-[url('/blobs3.svg')] bt`}>
      <div className="col-span-2 p-10">
        <div className="ml-10 relative w-full h-fit">
          <h1 className="z-[10] relative font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-stone-950">Stuck on what to order?</h1>
          <Image className="saturate-100 z-[9] absolute bottom-0 left-[0] translate-x-[-50%] translate-y-[50%]" src={FedUpImage} alt="🤦🏽‍♀️ emoji fedup" width={100} height={100}/>
          <Image className="saturate-100 z-[9] absolute top-0 right-[0] translate-x-[0%] sm:translate-x-[-10%] translate-y-[-25%]" src={DiscontentImage} alt="😥 emoji crying" width={100} height={100}/>
        </div>
      </div>
      <div className="flex flex-col items-end text-right float-right col-start-2 col-span-2 p-12">
        <div className="mr-12 relative w-full h-fit">
          <h1 className="z-[10] relative font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-stone-950"> Find hidden gems now.</h1>
          <Image className="saturate-100 z-[9] absolute bottom-0 right-0 translate-x-[50%] translate-y-[0%]" src={HeartImage} alt="😍 emoji hearts" width={100} height={100}/>
          <Image className="saturate-100 z-[9] absolute top-0 left-0 translate-x-[50%] translate-y-[-25%]" src={TastyImage} alt="😋 emoji tasty" width={100} height={100}/>
        </div>
      </div>

      <div className="ml-10 flex flex-col items-start text-left float-right col-start-1 col-span-2 p-10">
        <div className="mr-12 relative w-fit h-fit">
          <h1 className="z-[10] relative font-poppins font-bold text-4xl md:text-5xl  lg:text-6xl text-stone-950">Start your search.</h1>
          <Image className="saturate-100 z-[9] absolute bottom-0 right-0 translate-x-[50%] translate-y-[0%]" src={GlassImage} alt="🔎 emoji magnifying glass" width={100} height={100}/>
        </div>
      </div>
    </main>
  )
}


