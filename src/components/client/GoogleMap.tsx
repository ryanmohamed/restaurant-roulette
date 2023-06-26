import useLocationContext from '@/hooks/useLocationContext';
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import useCookie from '@/hooks/useCookie';

const containerStyle = {
    width: '100%',
    height: '400px'
  };
  
const position = {
    lat: 37.772,
    lng: -122.214
};
  
export default function Map () {
    const { location, setLocation } = useLocationContext();
    const [ locationCookie, setLocationCookie ] = useCookie("x-restaurant-roulette-location");
    const mapOptions = useMemo<google.maps.MapOptions>(
      () => ({
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
      }),
      []
    );
  
    return (
        <div className="rounded-2xl overflow-hidden shadow-black shadow-xl">
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}
            >
                <GoogleMap
                options={mapOptions}
                mapContainerStyle={containerStyle}
                center={{
                    lat: location?.lat || position.lat,
                    lng: location?.lon || position.lng
                }}
                zoom={15}
                >

                <MarkerF
                    draggable={true}
                    position={{
                    lat: location?.lat || position.lat,
                    lng: location?.lon || position.lng
                    }}
                    onDragEnd={ async (e) => {
                        const lat = e.latLng?.lat();
                        const lon = e.latLng?.lng();
                        console.log(lat, lon)
                        const information = await fetchReverseGeocode(lat, lon);
                        console.log(information);
                        if (information?.length !== 3) return;
                        const [ address, city, state ] = information as [string, string, string];
                        console.log(information)

                        const newLocation = {
                            city: information[0] as string, // formatting quick solution, todo: refactor in locaiton context
                            regionName: information[1] as string,
                            zip: information[2] as string,
                            lat: lat || position.lat as number,
                            lon: lon || position.lng as number
                        }
                        console.log(newLocation)
                        const cookieOptions = {
                            expires: new Date(Date.now() + 1 * 1 * 60 * 60 * 1000) // in 1 hour
                        };
                        const locationString = JSON.stringify(newLocation);
                        setLocationCookie(locationString, cookieOptions);
                        setLocation && setLocation(newLocation);
                    }}
                />

                </GoogleMap>
            </LoadScript>
        </div>
    );
}

async function fetchReverseGeocode (lat: any, lon: any) {
    try {
      const response = await fetch(`/api/geocode/get_location?latitude=${lat}&longitude=${lon}`, { method: "GET", headers: { 'Content-Type': 'application/json' }});
      console.log("response", response);
      if (response.status !== 200) throw new Error("Error occured getting location information.");
      const data = await response.json();
      console.log("data", data);
      if (data === null || data === undefined) throw new Error("Error occured getting location information.");
      const terms = data.formatted_address?.split(',');
      return terms;
    }
    catch (err) {
      console.log(err)
    }
}