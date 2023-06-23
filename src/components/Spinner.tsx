import SpinnerIcon from "./svgs/SpinnerIcon";

export default function Spinner () {
    return (
        <div className="centered flex-col">
            <SpinnerIcon fill="#991b1b" className="animate-spin h-48 w-48 z-inherit" />
            <p className="font-poppins font-semibold text-2xl text-center text-stone-950 mt-6">Loading something yummy...</p>
        </div>
    );
}