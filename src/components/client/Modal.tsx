import { ReactNode, useEffect } from "react";

export default function Modal ({ show, close, children}: { show: boolean, close: CallableFunction, children? : ReactNode }) {
    useEffect(() => {
         // handle esc for accessibility
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line
    }, []);

   
    const handleKeyDown = (e: any) => {
        if(e.key === 'Escape') {
            close();
        }
    }
    return (
        <div className={`${show ? "block": "hidden"} w-screen h-screen fixed top-0 left-0 z-[999] grid place-items-center`}>
            <div className="absolute top-0 left-0 w-full h-full bg-[#00000099]" onClick={() => close()}></div>
            <div className="z-[1000] w-4/5">
                {children}
            </div>
        </div>
    );
}