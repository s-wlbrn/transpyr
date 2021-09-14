import React, { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';

import { EventThumbnail } from '../../../../components/EventThumbnail/EventThumbnail.component';
import { EventStartDateShort } from '../../../../components/EventStartDateShort/EventStartDateShort.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './MyBookingsCard.styles.scss';

export const MyBookingsCard = forwardRef(
  ({ event, handleClick, handleHover }, ref) => {
    const { _id, name, photo, dateTimeStart, total } = event;
    return (
      <Row
        as="li"
        className="my-bookings-card"
        ref={ref}
        onMouseOver={() => handleHover(_id)}
        onMouseOut={() => handleHover(_id)}
      >
        <Col xs={3}>
          <EventThumbnail id={photo} />
        </Col>
        <Col xs={5}>
          {!event.canceled ? (
            <EventStartDateShort dateTimeStart={dateTimeStart} />
          ) : (
            <Col xs={4} className="my-bookings-card-canceled">
              Canceled
            </Col>
          )}
          <div className="my-bookings-card-name">{name}</div>
          <div className="my-bookings-card-total">{`Total bookings: ${total}`}</div>
        </Col>
        <Col xs={4}>
          <CustomButton
            type="button"
            onClick={() => handleClick(`/bookings/my-bookings/event/${_id}`)}
          >
            Manage
          </CustomButton>
          <CustomButton onClick={() => handleClick(`/events/id/${_id}`)}>
            View Event
          </CustomButton>
        </Col>
      </Row>
    );
  }
);
