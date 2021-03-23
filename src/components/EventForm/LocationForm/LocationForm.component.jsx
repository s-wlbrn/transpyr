import React, { useState } from 'react';

import { Row, Col, Container } from 'react-bootstrap';
import AddressAutocompleteInput from '../../AddressAutocompleteInput/AddressAutocompleteInput.component';

import { EventDetailsMap } from '../../EventDetailsMap/EventDetailsMap.component';

import './LocationForm.styles.scss';

export const LocationForm = ({
  handleChange,
  onlineOnly,
  address,
  location,
}) => {
  const [locationValid, setLocationValid] = useState(false);
  console.log(locationValid);
  return (
    <Container fluid className="location-form">
      <Row>
        <Col xs={12}>
          <h2>Enter an address for the event.</h2>
        </Col>
      </Row>
      {onlineOnly ? (
        <Row>
          <Col xs={12}>
            {onlineOnly ? (
              <p className="no-location-message">
                Since all ticket types specified are for online attendence, this
                event is currently <strong>online-only</strong>. To add a
                physical location, please create an in-person ticket type in the
                previous section. Otherwise, click "Next" to continue.
              </p>
            ) : (
              <p>
                Enter an address or location name and locate a valid address
                from the options.
              </p>
            )}
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={12}>
          <label htmlFor={'autocomplete'} className="address-label">
            Address
          </label>
          <AddressAutocompleteInput
            address={address}
            handleChange={handleChange}
            setLocationValid={setLocationValid}
            disabled={onlineOnly ? true : false}
          />
        </Col>
        {location.coordinates.length ? (
          <Col xs={12} className="location-map">
            <EventDetailsMap coordinates={location.coordinates} />
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};
