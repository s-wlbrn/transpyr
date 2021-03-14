import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import './MapContainer.styles.scss';

const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const MapContainer = ({ coordinates, google }) => {
  const coords = {
    lat: coordinates[1],
    lng: coordinates[0],
  };
  console.log(coords);
  return (
    <Map
      style={mapStyles}
      google={google}
      zoom={18}
      center={{ ...coords }}
      containerStyle={{
        position: 'relative',
        width: '100%',
        height: '25rem',
        marginBottom: '1rem',
      }}
    >
      <Marker name={'Event location'} position={{ ...coords }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
})(MapContainer);
