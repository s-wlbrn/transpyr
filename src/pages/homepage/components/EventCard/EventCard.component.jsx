import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';
import { IoShareSocial } from 'react-icons/io5';

import { EventThumbnail } from '../../../../components/EventThumbnail/EventThumbnail.component';
import { EventStartDateShort } from '../../../../components/EventStartDateShort/EventStartDateShort.component';

import './EventCard.styles.scss';

export const EventCard = ({
  event,
  handleClick,
  toggleFavorite,
  favoritesMap,
}) => {
  const { _id, name, dateTimeStart, priceDisplay, photo, soldOut, canceled } =
    event;

  return (
    <Row as="li" className="event-card" onClick={() => handleClick(_id)}>
      <Col xs={3}>
        <EventThumbnail id={photo} />
      </Col>
      <Col className="event-card-name-date" xs={6}>
        <EventStartDateShort dateTimeStart={dateTimeStart} />
        <div>{name}</div>
      </Col>
      <Col xs={3} className="event-card-price-icons">
        <Row>
          {canceled ? (
            <div className="event-card-canceled">Canceled</div>
          ) : soldOut ? (
            <div className="event-card-sold-out">Sold Out</div>
          ) : (
            <div className="event-card-price">{priceDisplay}</div>
          )}
        </Row>
        <Row className="event-card-icons">
          {favoritesMap && (
            <span
              className="event-card-favorite-icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(_id);
              }}
            >
              {favoritesMap[_id] ? (
                <IoHeart size={24} />
              ) : (
                <IoHeartOutline size={24} />
              )}
            </span>
          )}
          <IoShareSocial size={24} />
        </Row>
      </Col>
    </Row>
  );
};
