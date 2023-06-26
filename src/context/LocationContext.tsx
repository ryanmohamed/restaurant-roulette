import { useState, createContext, useEffect } from "react";
import type { FC, Dispatch, SetStateAction, ReactNode } from "react";
import useCookie from "@/hooks/useCookie";

type CoordinateType = {
    city: string,
    regionName: string,
    zip: string,
    lat: number,
    lon: number
}

type LocationContextType = {
    loading: boolean,
    error: string | null,
    location: CoordinateType | null,
    setLocation: Dispatch<SetStateAction<CoordinateType | null>> | null,
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>> | null
};

export const LocationContext = createContext<LocationContextType>({
    loading: true,
    error: null,
    location: null,
    setLocation: null,
    showModal: false,
    setShowModal: null
});

export const LocationProvider: FC<{ children?: ReactNode }>= ({children}) => 
{ 
    const [ location, setLocation ] = useState<CoordinateType | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    // cookies
    const [ locationCookie, setLocationCookie, removeLocationCookie ] = useCookie("x-restaurant-roulette-location");

    const fetchIP = async (): Promise<string | null> => {
        try {
            const response = await fetch("https://api.ipify.org?format=json", { method: "GET" });
            if (response.status !== 200) throw new Error("Failed to fetch client IP from ipify.");
            const ip_json = await response.json();
            return ip_json.ip as string;
        }
        catch (error) {
            console.error("Failed to fetch IP address", error);
            return null;
        }
    }

    const fetchLocation = async (): Promise<void> => {
        // ip to location
        const ip = await fetchIP();
        if (!ip) {
            setError("Failed to fetch IP address");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://ip-api.com/json/${ip}`, { method: "GET" });
            if (response.status !== 200) throw new Error("Failed to fetch location data.");
            const locationData = await response.json();
            if (locationData.status !== "success") throw new Error("Failed to fetch location data.");
            // use default values if response isn't as expected
            const { city = "Montreal", regionName = "Quebec", zip = "H3H", lat = 45.5075, lon = -73.5887 } = locationData;
            const loc: CoordinateType = { city, regionName, zip, lat, lon };
            setLocation(loc);
            setLoading(false);
            setError(null);

            const cookieOptions = {
                expires: new Date(Date.now() + 1 * 1 * 60 * 60 * 1000) // in 1 hour
            };
            const locationString = JSON.stringify(loc);
            setLocationCookie(locationString, cookieOptions);
        }

        catch (error) {
            console.log("Failed to fetch location data: ", error);
            setError("Failed to fetch location data: ");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (locationCookie) {
            console.log("USING COOKIE DATA");
            setLocation(locationCookie);
            setLoading(false);
            setError(null);
        } 
        else {
            console.log("MAKING API CALLS");
            fetchLocation();
        }
        /* eslint: disable */
    }, []);
     /* eslint: enable */

    const contextValue: LocationContextType = {
        loading, error, location, setLocation, showModal, setShowModal
    };

    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    );
}