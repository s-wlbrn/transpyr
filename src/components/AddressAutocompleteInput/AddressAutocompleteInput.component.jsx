import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { FormInput } from '../FormInput/FormInput.component';

class AddressAutocompleteInput extends React.Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new this.props.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { fields: ['formatted_address', 'geometry'] }
    );
    //  this.geocoder = new this.props.google.maps.Geocoder();
    this.autocomplete.setFields(['address_component']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    let addressObject = this.autocomplete.getPlace();
    console.log(addressObject.geometry.location.lat());
    this.props.handleChange({
      target: { name: 'address', value: addressObject.formatted_address },
    });
    this.props.handleChange({
      target: {
        name: 'location',
        value: [
          addressObject.geometry.location.lng(),
          addressObject.geometry.location.lat(),
        ],
      },
    });
    this.props.setLocationValid(true);
  };

  render() {
    return (
      <FormInput
        name="address"
        type="text"
        id="autocomplete"
        onChange={(e) => {
          if (this.props.setLocationValid === true)
            this.props.setLocationValid(false);
        }}
        defaultValue={this.props.address}
        disabled={this.props.disabled}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
})(AddressAutocompleteInput);
