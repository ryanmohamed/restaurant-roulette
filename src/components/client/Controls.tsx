import useLocationContext from "@/hooks/useLocationContext";
import { Dispatch, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import FilterForm from "./FilterForm";

export default function Controls ({ setSearchTerms }: { setSearchTerms:  Dispatch<string | null> }) {
    const { location } = useLocationContext();
    const searchTermRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchTerms(event.target.value);
    }
    useEffect(() => {
        if (searchTermRef && searchTermRef.current) {
            searchTermRef.current.value = "";
            setSearchTerms(null);
        }
    }, [ router.pathname ])
    return (
        <>
            <div>
            <div className="flex flex-col text-sm mt-4">
                <p className="flex justify-between text-right"><b className="mr-4">Location:</b> <span>{location ? `${location.city}, ${location.regionName}, ${location.zip}` : "Montreal, Quebec, H3H"}</span></p>
                <button className="self-end w-fit text-red-500 text-sm cursor-pointer">Change location</button>
            </div>
            </div>

            <FilterForm />

            {/* <div className="mt-8 flex items-center justify-between md:justify-start md:items-start md:flex-col ml-2 md:ml-0">
            <p className="mb-2">Looking for something specific?</p>
            <input 
            type="text"
                ref={searchTermRef}
                onChange={handleSearchChange}
                className="ml-2 md:ml-0 py-1 px-3 w-full max-w-[400px] rounded-full bg-stone-100 font-barlow text-base text-stone-950 "
                name="search-terms" 
                placeholder='(e.g: Breakfast, Deli, Fried Rice)'
            />
            </div>

            <div className="mt-8">
            <p>Restaurant Attributes</p>
            <div className="flex flex-wrap">
                <div className="m-1 w-[22%] md:w-[45%]">
                <p className="text-sm">Price:</p>
                {/* <Select className="h-fit font-barlow text-stone-950" options={[
                    { value: "$", label: "$"},
                    { value: "$$", label: "$$"},
                    { value: "$$$", label: "$$$"},
                ]}/>
                </div>
                <div className="m-1 w-[22%] md:w-[45%]">
                <p className="text-sm">Distance:</p>
                <Select className="h-fit font-barlow text-stone-950" options={[
                    { value: "5 miles", label: "5 miles"},
                    { value: "10 miles", label: "10 miles"},
                    { value: "25 miles", label: "25 miles"},
                ]}/> /}
                </div>
            </div>
            </div>

            <div className="mt-8">
            <p className="mb-2">More Attributes</p>
            <div className="flex flex-wrap">
                <label className="m-1 p-2 select-none border-2 border-red-600 rounded-md cursor-pointer transition-colors hover:border-red-500">
                Hot and New 🔥
                <input 
                    className="hidden"
                    type="checkbox"
                    name="hot-n-new"
                    value="hot-n-new"
                />
                </label>

                <label className="m-1 p-2 select-none border-2 border-green-600 rounded-md cursor-pointer transition-colors hover:border-green-500">
                Deals 🤑
                <input 
                    className="hidden"
                    type="checkbox"
                    name="deals"
                    value="deals"
                />
                </label>
            </div>
            </div> */}
        </>
    );
}