import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const GeoLoc = () => {
  const userCoords = [19.116860277321386, 72.84988485670782]; // Your exact location

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={userCoords} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userCoords}>
          <Popup>
            You are here (Lat: 19.1079808, Long: 72.8377342) 📍
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GeoLoc;
