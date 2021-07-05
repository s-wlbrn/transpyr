import React, { useEffect, useRef, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import myAxios from '../../auth/axios.config';
import { calculateEventInfo } from '../../libs/calculateEventInfo';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LocationButton } from './components/LocationButton/LocationButton.component';
import { FilterMenu } from './components/FilterMenu/FilterMenu.component';
import { EventList } from './components/EventList/EventList.component';
import { PageControl } from './components/PageControl/PageControl.component';

import './homepage.styles.scss';

const Homepage = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState({
    sort: 'dateTimeStart',
    fields:
      '_id,name,dateTimeStart,dateTimeEnd,photo,ticketTiers,totalBookings,soldOut,canceled',
    online: true,
    paginate: { page: 1, limit: 10 },
  });
  const numberOfPagesRef = useRef(null);
  const handleError = useErrorHandler();

  const handleChangeQuery = (selections) => {
    setQuery({
      ...query,
      ...selections,
    });
  };

  const handleChangePage = (page) => {
    if (page > 0 && page <= numberOfPagesRef.current) {
      handleChangeQuery({
        paginate: {
          ...query.paginate,
          page,
        },
      });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsFetching(true);
        const response = await myAxios().get(
          'http://localhost:3000/api/events',
          {
            params: query,
          }
        );
        const events = response.data.data.map((el) => calculateEventInfo(el));
        numberOfPagesRef.current = response.data.pages;
        setEvents(events);
        setIsFetching(false);
      } catch (err) {
        handleError(err);
      }
    };

    fetchEvents();
  }, [query, handleError]);

  return (
    <Container as="main" fluid className="homepage">
      <Row>
        <Col xs={12} className="homepage-description">
          Browse popular events...
        </Col>
      </Row>
      <Row className="homepage-location-buttons">
        <Col xs={6}>
          <LocationButton
            active={query.online}
            handleChange={handleChangeQuery}
            name="Online"
          />
        </Col>
        <Col xs={6}>
          <LocationButton
            active={!query.online}
            handleChange={handleChangeQuery}
            name="Near you"
          />
        </Col>
      </Row>
      <FilterMenu query={query} handleChange={handleChangeQuery} />
      <EventList isFetching={isFetching} events={events} />
      <PageControl
        page={query.paginate.page}
        totalPages={numberOfPagesRef.current}
        handleChange={handleChangePage}
      />
    </Container>
  );
};

export default Homepage;
