import React, { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';

import { EventThumbnail } from '../../../../components/EventThumbnail/EventThumbnail.component';
import { EventStartDateShort } from '../../../../components/EventStartDateShort/EventStartDateShort.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './MyEventsCard.styles.scss';

export const MyEventsCard = forwardRef(
  ({ event, handleClick, handleHover }, ref) => {
    const { id, name, photo, dateTimeStart, published } = event;
    return (
      <Row
        as="li"
        className="manage-events-card"
        ref={ref}
        onMouseOver={() => handleHover(id)}
        onMouseOut={() => handleHover(id)}
      >
        <Col xs={3}>
          <EventThumbnail
            src={`http://localhost:3000/static/img/events/${photo}`}
          />
        </Col>
        <Col xs={5}>
          <EventStartDateShort dateTimeStart={dateTimeStart} />
          <div className="manage-events-card-name">{name}</div>
        </Col>
        {!event.canceled ? (
          <Col xs={4}>
            {!published ? (
              <CustomButton
                type="button"
                onClick={() => handleClick(`/events/id/${id}/publish`)}
              >
                Publish
              </CustomButton>
            ) : (
              <CustomButton
                type="button"
                onClick={() => handleClick(`/events/id/${id}/manage`)}
              >
                Manage
              </CustomButton>
            )}
            <CustomButton onClick={() => handleClick(`/events/id/${id}/edit`)}>
              Edit
            </CustomButton>
          </Col>
        ) : (
          <Col xs={4} className="manage-events-card-canceled">
            Canceled
          </Col>
        )}
      </Row>
    );
  }
);
