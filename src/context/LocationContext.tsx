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

    const handleAndThrowError = (error: string | unknown | any) => {
        console.log("Handling", error)
        setError(error as string);
        setLoading(false);
        throw error;
    } 


    const handleError = (message: any) => {
        console.log("Handling error", error)
        setError(message as string);
        setLoading(false);
    } 

    const storeLocationAsCookies = (l: CoordinateType) => {
        const cookieOptions = {
            expires: new Date(Date.now() + 1 * 1 * 60 * 60 * 1000) // in 1 hour
        };
        const locationString = JSON.stringify(l);
        setLocationCookie(locationString, cookieOptions);
    }

    const acceptLocationData = (locationData: any) => {
        // use default values if response isn't as expected
        const { city = "Montreal", regionName = "Quebec", zip = "H3H", lat = 45.5075, lon = -73.5887 } = locationData ?? {city: "Montreal", regionName: "Quebec", zip: "H3H", lat: 45.5075, lon: -73.5887 };
        const newLocation: CoordinateType = { city, regionName, zip, lat, lon };
        setLocation(newLocation);
        setLoading(false);
        setError(null);
        storeLocationAsCookies(newLocation);
    }   

    const handlePermissionDeniedOrUnaccessible = (error: any) => {
        // use the default locaiton in montreal for absolute failure to retrieve location
        acceptLocationData(null);
    }

    /* throws error if necessary */
    const fetchGeocodeData = async (latitude: number, longitude: number) => {
        const response = await fetch(`/api/geocode/get_location?latitude=${latitude}&longitude=${longitude}`, { method: "GET", headers: { "Content-Type": "application/json" } });
        if(response?.status !== 200) throw new Error("Failed to retrieve coordinate information from Google.");
        const data = await response.json();
        if(data === undefined || data === null) throw new Error("Failed to retrieve coordinate information from Google.");
        return data;
    }

    // if the user explicitly provides the location, use proxied google api to retrieve extra information about address
    const handlePermissionGrantedOrAccessible = async (position: GeolocationPosition) => {
        const { coords: { latitude, longitude} } = position;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchGeocodeData(latitude, longitude);
            const terms = data?.formatted_address?.split(',');
            if (typeof terms?.length !== "number" && terms.length < 3) handleAndThrowError("Failed to format address.");

            const [ address, city, state ] = terms;
            const newLocation = {
                city: address as string, // formatting quick solution, todo: refactor in locaiton context
                regionName: city as string,
                zip: state as string,
                lat: latitude,
                lon: longitude
            }
            acceptLocationData(newLocation);
        }
        catch (error) {
            removeLocationCookie({});
            handleAndThrowError("Failed to fetch location data.");
            const newLocation = { city: "Montreal", regionName: "Quebec", zip: "H3H", lat: 45.5075, lon: -73.5887 };
            acceptLocationData(newLocation);
        }
    };

    const fetchIP = async (): Promise<string | null> => {
        try {
            const response = await fetch("https://api.ipify.org?format=json", { method: "GET" });
            if (response.status !== 200) throw new Error("Failed to fetch client IP from ipify.");
            const ip_json = await response.json();
            return ip_json.ip as string;
        }
        catch (error) {
            handleError("Failed to fetch IP address");
            throw error;
        }
    }

    /*
        throws error to maintain one responsibility 
    */
    const fetchLocationWithIP = async (): Promise<void> => {
        try {
            const ip = await fetchIP(); // ip to location
            if (!ip) throw new Error("Failed to fetch IP data.");

            const response = await fetch(`http://isdp-api.com/json/${ip}`, { method: "GET" });
            if (response.status !== 200) throw new Error("Failed to fetch location data.");

            const locationData = await response.json();
            if (locationData.status !== "success") throw new Error("Failed to fetch location data.");

            acceptLocationData(locationData);
        }
        catch (error) {
            handleError(error);
            throw error;
        }
    }

    // ...

    useEffect(() => {
        const fetchLocation = async () => {
            if (locationCookie) {
                console.log("USING COOKIE DATA");
                setLocation(locationCookie);
                setLoading(false);
                setError(null);
            } 
            else {
                try {
                    console.log("MAKING API CALLS");
                    await fetchLocationWithIP();
                } 
                catch (error) {
                    console.log("FAILED TO RETRIEVE LOCATION WITH API METHODS.");
                    console.log("ASKING FOR LOCATION INSTEAD WITH GEOLOCATION.");
                    navigator.geolocation.getCurrentPosition(
                        handlePermissionGrantedOrAccessible,
                        handlePermissionDeniedOrUnaccessible
                    );
                }
            }
        };
        fetchLocation();
        /* eslint: disable */
    }, []);
    /* eslint: enable */
    
    // ...
  

    const contextValue: LocationContextType = {
        loading, error, location, setLocation, showModal, setShowModal
    };

    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    );
}