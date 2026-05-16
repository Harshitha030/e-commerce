import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

export default function GoogleMapSelector(){

  const [map,setMap] = useState(null);
  const [marker,setMarker] = useState({
    lat:17.385044,
    lng:78.486671
  });

  const [autocomplete,setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyAVo1nBydoIkpv8x0gXZik122uAkXtBGLc",
    libraries
  });

  const onPlaceChanged = ()=>{

    if(!autocomplete) return;

    const place = autocomplete.getPlace();

    if(!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setMarker({lat,lng});

    if(map) map.panTo({lat,lng});
  };

  const handleMapClick = (e)=>{

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker({lat,lng});
  };

  if(!isLoaded) return <h3>Loading map...</h3>;

  return(
    <div>

      <Autocomplete
        onLoad={(auto)=>setAutocomplete(auto)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            width:"100%",
            height:"40px",
            padding:"10px",
            marginBottom:"10px"
          }}
        />
      </Autocomplete>

      <GoogleMap
        center={marker}
        zoom={14}
        mapContainerStyle={{width:"100%",height:"400px"}}
        onLoad={(map)=>setMap(map)}
        onClick={handleMapClick}
      >
        <Marker position={marker}/>
      </GoogleMap>

    </div>
  );
}