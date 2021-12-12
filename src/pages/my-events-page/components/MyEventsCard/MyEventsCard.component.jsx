import React, { forwardRef } from 'react';
import { Col, Row } from 'react-bootstrap';

import { EventThumbnail } from '../../../../components/EventThumbnail/EventThumbnail.component';
import { EventStartDateShort } from '../../../../components/EventStartDateShort/EventStartDateShort.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './MyEventsCard.styles.scss';

export const MyEventsCard = forwardRef(
  ({ event, handleClick, handleHover }, ref) => {
    const handleButtonClick = (e, route) => {
      e.stopPropagation();
      handleClick(route);
    };

    const { id, name, photo, dateTimeStart, published } = event;
    return (
      <Row
        as="li"
        className="manage-events-card"
        ref={ref}
        onMouseOver={() => handleHover(id)}
        onMouseOut={() => handleHover(id)}
        onClick={() => handleClick(`/events/id/${id}`)}
      >
        <Col xs={3}>
          <EventThumbnail id={photo} />
        </Col>
        <Col xs={5}>
          <EventStartDateShort dateTimeStart={dateTimeStart} />
          <div className="manage-events-card-name">{name}</div>
          {!published && (
            <div className="manage-events-card-unpublished">
              (Not published)
            </div>
          )}
        </Col>
        {event.canceled ? (
          <Col xs={4} className="manage-events-card-canceled">
            Canceled
          </Col>
        ) : event.dateTimeStart < Date.now() ? (
          <Col xs={4} className="manage-events-card-past-event">
            Past Event
          </Col>
        ) : (
          <Col xs={4}>
            {!published ? (
              <CustomButton
                type="button"
                onClick={(e) =>
                  handleButtonClick(e, `/events/id/${id}/publish`)
                }
              >
                Publish
              </CustomButton>
            ) : (
              <CustomButton
                type="button"
                onClick={(e) => handleButtonClick(e, `/events/id/${id}/manage`)}
              >
                Manage
              </CustomButton>
            )}
            <CustomButton
              onClick={(e) => handleButtonClick(e, `/events/id/${id}/edit`)}
            >
              Edit
            </CustomButton>
          </Col>
        )}
      </Row>
    );
  }
);
