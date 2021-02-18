import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import './MapContainer.styles.scss';

const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {
        lat: props.coordinates[1],
        lng: props.coordinates[0],
      },
    };
  }

  render() {
    return (
      <Map
        style={mapStyles}
        google={this.props.google}
        zoom={14}
        initialCenter={{
          ...this.state.coords,
        }}
        containerStyle={{
          position: 'relative',
          width: '100%',
          height: '25rem',
          'margin-bottom': '1rem',
        }}
      >
        <Marker name={'Event location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbqh1OaBrOVReUHCDvLfP7_py2fDxni7o',
})(MapContainer);
