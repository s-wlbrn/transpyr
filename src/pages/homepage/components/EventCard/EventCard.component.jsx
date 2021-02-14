import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';
import { IoShareSocial } from 'react-icons/io5';

import './EventCard.styles.scss';

export const EventCard = (props) => {
  const { name, date, price } = props.event;
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <Row className="event-card">
      <Col xs={3}>
        <img src="/default.jpg" alt={name} />
      </Col>
      <Col xs={6}>
        <p>{formattedDate}</p>
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
