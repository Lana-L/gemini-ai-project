import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./App.css";

const mevoIcon = new L.divIcon({
  className: "mevo-marker",
  iconSize: [24, 24],
  html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#00afdd" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10H20C20.5523 10 21 10.4477 21 11V17C21 17.5523 20.5523 18 20 18H17C16.4477 18 16 17.5523 16 17V11C16 10.4477 16.4477 10 17 10Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 11H16V17H1V11Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 18V21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 18V21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 11L4 7H13L16 11H1Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
});

function PopupContent({ lat, lon }) {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => setAddress(data.address));
  }, [lat, lon]);

  return (
    <div>
      {address ? (
        <p>{address.road}{address.city ? `, ${address.city}` : ""}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function App() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://api.mevo.co.nz/public/vehicles/wellington")
      .then((response) => response.json())
      .then((data) => setVehicles(data.data.features));
  }, []);

  return (
    <MapContainer center={[-41.28664, 174.77557]} zoom={13} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {vehicles.map((vehicle, index) => (
        <Marker key={index} position={[vehicle.geometry.coordinates[1], vehicle.geometry.coordinates[0]]} icon={mevoIcon}>
          <Popup>
            <PopupContent lat={vehicle.geometry.coordinates[1]} lon={vehicle.geometry.coordinates[0]} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
