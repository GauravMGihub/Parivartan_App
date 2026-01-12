import React, { useEffect, useState, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// 1. Fix for default Leaflet marker icons not showing up in React
const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// 2. Helper component to handle "animateToRegion" logic
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center]);
  return null;
};

// 3. The Marker Wrapper
export const MapMarker = ({ coordinate, title, description, pinColor }) => {
  if (!coordinate) return null;
  // Convert { latitude, longitude } to [lat, lng]
  const position = [coordinate.latitude, coordinate.longitude];
  
  return (
    <LeafletMarker position={position}>
      {(title || description) && (
        <Popup>
          <strong>{title}</strong><br />{description}
        </Popup>
      )}
    </LeafletMarker>
  );
};

export const PROVIDER_GOOGLE = 'google';

// 4. Main Map Component
const MapViewer = React.forwardRef((props, ref) => {
  const [center, setCenter] = useState(
    props.initialRegion 
      ? [props.initialRegion.latitude, props.initialRegion.longitude]
      : [18.635, 73.78] // Default Pune
  );

  // Inject Leaflet CSS dynamically so you don't have to edit index.html
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  // Expose methods to parent (like animateToRegion)
  useImperativeHandle(ref, () => ({
    animateToRegion: (region) => {
      if (region && region.latitude && region.longitude) {
        setCenter([region.latitude, region.longitude]);
      }
    }
  }));

  return (
    <View style={[props.style, { overflow: 'hidden' }]}> 
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false} // Disable scroll zoom for better page scrolling
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} />
        {props.children}
      </MapContainer>
    </View>
  );
});

export default MapViewer;