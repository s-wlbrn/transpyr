import React from 'react';

import Container from 'react-bootstrap/Container';
import { EventCard } from '../EventCard/EventCard.component';

import './EventList.styles.scss';

export const EventList = (props) => (
  <Container as="section" className="event-listing">
    {props.events.map((el) => (
      <EventCard key={el.id} event={el} />
    ))}
  </Container>
);
