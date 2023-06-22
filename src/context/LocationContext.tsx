import React, { useState, createContext, useEffect } from "react";

type CoordinateType = {
    city: string,
    regionName: string,
    zip: string,
    lat: number,
    lon: number
}

type LocationContextType = {
    location: CoordinateType | null,
    setLocation: React.Dispatch<React.SetStateAction<CoordinateType | null>> | null
}  

export const LocationContext = createContext<LocationContextType>({
    location: null,
    setLocation: null
});

export const LocationProvider = ({children}: { children?: any}) => 
{ 
    const [ location, setLocation ] = useState<CoordinateType | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    const fetchIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json", { method: "GET" });
        if (response.status !== 200) return null;
        
        const ip_json = await response.json();
        return ip_json.ip ?? null;
    }

    const fetchLocation = async () => {
        const ip = await fetchIP();
        const response = await fetch(`http://ip-api.com/json/${ip}`, { method: "GET" });
        // was the message recieved?
        if (response.status !== 200) return null;

        // did we do anything wrong
        const json = await response.json();
        if (json.status !== "success") return null;

        // use default values if response isn't as expected
        const city = json?.city ?? "Montreal";
        const regionName = json?.regionName ?? "Quebec";
        const zip = json?.zip ?? "H3H";
        const lat = json?.lat ?? "45.5075";
        const lon = json?.lon ?? "-73.5887";
        
        setLocation({
            city: city, 
            regionName: regionName, 
            zip: zip,
            lat: lat, 
            lon: lon
        })
        console.log(city, regionName, lat, lon);
    }

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}