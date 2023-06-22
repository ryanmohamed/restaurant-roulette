import { ReactNode } from "react";
import Footer from "./Footer"; 
import Landing from "./Landing";
import Nav from "./Nav";
import SidePanel from "./SidePanel";

export default function Layout ({ children }: { children: ReactNode } ) {
    return (
        <div className="pt-14 min-screen-h">
            <Landing />
            <Nav />
            <section id="content" className="screen-h flex flex-col md:flex-row pt-[55px] mt-[-55px]">
                <SidePanel />
                {children}
            </section>
            <Footer />
        </div>
    );
}