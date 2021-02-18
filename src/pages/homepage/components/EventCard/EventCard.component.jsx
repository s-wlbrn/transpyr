import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';
import { IoShareSocial } from 'react-icons/io5';

import { EventStartDateShort } from '../../../../components/EventStartDateShort/EventStartDateShort.component';

import './EventCard.styles.scss';

export const EventCard = (props) => {
  const { name, dateStart, price } = props.event;
  return (
    <Row className="event-card">
      <Col xs={3}>
        <img src="/default.jpg" alt={name} />
      </Col>
      <Col className="event-card-name-date" xs={6}>
        <EventStartDateShort dateStart={dateStart} />
        <p>{name}</p>
      </Col>
      <Col xs={3}>
        <Row>
          <p className="price">{price}</p>
        </Row>
        <Row className="icons">
          <IoHeartOutline size={24} />
          <IoShareSocial size={24} />
        </Row>
      </Col>
    </Row>
  );
};
