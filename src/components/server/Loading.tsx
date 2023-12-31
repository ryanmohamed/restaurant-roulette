import SpinnerIcon from "../svgs/SpinnerIcon";

export default function Loading () {
    return (
        <div className="z-[99] centered flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  ">
            <SpinnerIcon fill="#991b1b" className="animate-spin h-48 w-48 z-inherit" />
            <p className="font-poppins font-semibold text-2xl text-center text-stone-950 mt-6">Loading something yummy...</p>
        </div>
    );
}