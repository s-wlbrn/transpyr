import React from 'react';

import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { EventCard } from '../EventCard/EventCard.component';

import './EventList.styles.scss';

export const EventList = (props) => (
  <Container as="section" className="event-listing" fluid>
    {props.events.map((el) => (
      <Link to={`/events/id/${el.id}`}>
        <EventCard key={el.id} event={el} />
      </Link>
    ))}
  </Container>
);
