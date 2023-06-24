import { ReactNode } from "react";
import Footer from "./server/Footer"; 
import Landing from "./client/Landing";
import Nav from "./server/Nav";
import SidePanel from "./client/SidePanel";

export default function Layout ({ children }: { children: ReactNode } ) {
    return (
        <div className="pt-14 min-screen-h">
            <Landing />
            <Nav />
            <section id="content" className="min-screen-h flex flex-col md:flex-row pt-[55px] mt-[-55px]">
                <SidePanel />
                {children}
            </section>
            <Footer />
        </div>
    );
}