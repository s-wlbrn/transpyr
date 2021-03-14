import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddressAutocompleteInput from '../../../../components/AddressAutocompleteInput/AddressAutocompleteInput.component';

import { EventDetailsMap } from '../../../../components/EventDetailsMap/EventDetailsMap.component';
//import { MapContainer } from '../../../../components/MapContainer/MapContainer.component';

import './LocationForm.styles.scss';

export const LocationForm = ({
  handleChange,
  onlineOnly,
  address,
  coordinates,
}) => {
  const [locationValid, setLocationValid] = useState(false);
  console.log(locationValid);
  return (
    <React.Fragment>
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
                event is currently online-only. To add a physical location,
                please create an in-person ticket type in the previous section.
                Otherwise, click "Next" to continue.
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
          <AddressAutocompleteInput
            address={address}
            handleChange={handleChange}
            setLocationValid={setLocationValid}
          />
        </Col>
        {coordinates.length ? (
          <Col xs={12}>
            <EventDetailsMap coordinates={coordinates} />
          </Col>
        ) : null}
      </Row>
    </React.Fragment>
  );
};
