import './App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, Circle } from "@react-google-maps/api";
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

// toast.configure();

function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_CONNECTION_KEY,
    libraries: ['places']
  })

  const [map, setMap] = useState( /** @type google.maps.map */ (null));

  const [position, setPosition] = useState({ lat: 40.706001, lng: -73.997002 });
  /** @type React.MuteableRefObject<HTMLInputElement> */
  const originRef = useRef()

  const notify = () => {
    toast("You are near these places");
  }

  if(!isLoaded) {
    return (
      <div className="App"> 
        <h1> LOADING </h1> 
      </div>
    )
  }

  return (
    <div className="body">
      <h4> Map </h4>
      <Autocomplete>
        <input placeholder="Location" ref={originRef} />
        
      </Autocomplete>

      <button onClick={() => map.panTo(position)}> Center </button>

      <button onClick={notify}> Toast </button>
      <ToastContainer />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onClick={ev => {
          console.log("latitide = ", ev.latLng.lat());
          console.log("longitude = ", ev.latLng.lng());
          setPosition({lat: ev.latLng.lat(), lng: ev.latLng.lng()})
          notify();
        }}
      >
        <Marker
          position={position}
         />
        <Marker
          position={{lat: 40.706001, lng: -73.997002}}
        />        
        <Marker
          position={{lat: 40.785091, lng: -73.968285}}
        />
        <Marker
          position={{lat: 40.715751, lng: -73.997031}}
        />
        <Marker
          position={{lat: 40.6912045, lng: -73.989508}}
        />
        <Marker
          position={{lat: 40.758678, lng: -73.978798}}
        />
        <Circle
          onClick={(event) => {
            console.log("click");
          }}
          center={position}
          radius={500}
        />
      </GoogleMap>
      
    </div>
  );
}

export default App;
