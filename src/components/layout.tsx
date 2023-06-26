import { ReactNode } from "react";
import Footer from "./server/Footer"; 
import Landing from "./client/Landing";
import Nav from "./client/Nav";
import SidePanel from "./client/SidePanel";
import useLocationContext from "@/hooks/useLocationContext";
import Modal from "./client/Modal";
import GoogleMap from "./client/GoogleMap";

export default function Layout ({ children }: { children: ReactNode } ) {
    
    const { showModal, setShowModal } = useLocationContext();
    return (
        <div className="pt-14 min-screen-h">
            <Modal show={showModal} close={() => setShowModal && setShowModal(false)}>
                <div>
                    <p className="mb-4 text-white font-poppins font-bold text-center text-2xl">Move the marker to your new location, the app will updated automatically.</p>
                    <GoogleMap />
                    <p className="mt-4 text-white font-poppins font-bold text-center text-2xl">Click anywhere to close.</p>
                </div>
            </Modal>
            
            <Landing />
            <Nav />
            <section id="content" className="min-screen-h flex flex-col md:flex-row mt-[-55px] pt-[55px] ">
                <SidePanel />
                {children}
            </section>
            <Footer />
        </div>
    );
}