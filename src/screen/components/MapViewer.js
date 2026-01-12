import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Re-export Marker and Provider so we don't import them from the library directly in screens
export { Marker as MapMarker, PROVIDER_GOOGLE };

// Pass all props (like style, region) directly to the native MapView
const MapViewer = React.forwardRef((props, ref) => {
  return <MapView ref={ref} {...props} />;
});

export default MapViewer;