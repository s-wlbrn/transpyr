import React from 'react';
import { format, isSameDay } from 'date-fns';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { EventLocation } from './EventLocation/EventLocation.component';
import { EventDetailsMap } from './EventDetailsMap/EventDetailsMap.component';
import { EventDetailsDate } from './EventDetailsDate/EventDetailsDate.component';
import { EventDescription } from '../../../components/EventDescription/EventDescription.component';

import './EventDetails.styles.scss';

export const EventDetails = ({
  name,
  convertedDescription,
  price,
  dateStart,
  dateEnd,
  locations,
  address,
  online,
}) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12} className="event-image-container">
          <div className="event-image-background">
            <img src="/default.jpg" alt={name} className="event-detail-image" />
          </div>
        </Col>
        <Col xs={12}>
          <p className="event-detail-date">{format(dateStart, 'PPPPp O')}</p>
          <h1 className="event-detail-name">{name}</h1>
          <hr className="event-detail-titlebreak" />
        </Col>
      </Row>
      <Row className="event-details">
        <Col xs={12}>
          <h2>When</h2>
          <EventDetailsDate
            dateStart={dateStart}
            dateEnd={dateEnd}
            isSameDay={isSameDay(dateStart, dateEnd)}
          />
        </Col>
        <Col xs={12}>
          <h2>Where</h2>
          <EventLocation
            locations={locations}
            address={address}
            online={online}
          />
        </Col>
        <Col xs={12}>
          <h2>Description</h2>
          <EventDescription convertedDescription={convertedDescription} />
        </Col>
      </Row>
      {locations.length ? (
        <EventDetailsMap coordinates={locations[0].coordinates} />
      ) : null}
    </React.Fragment>
  );
};
