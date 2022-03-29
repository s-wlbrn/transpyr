import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Container, Row, Col } from 'react-bootstrap';

import API from '../../api';
import { usePagination } from '../../libs/usePagination';

import { LocationButton } from './components/LocationButton/LocationButton.component';
import { FilterMenu } from './components/FilterMenu/FilterMenu.component';
import { EventList } from './components/EventList/EventList.component';
import { PageControl } from './components/PageControl/PageControl.component';
import { HomepageHero } from '../../components/HomepageHero/HomepageHero.component';

import './homepage.styles.scss';

const Homepage = (props) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [events, setEvents] = useState([]);
  const { totalPages, currentPage, setTotalPages, handleChangePage } =
    usePagination();
  const [query, setQuery] = useState({
    sort: 'dateTimeStart',
    fields:
      '_id,name,organizer,dateTimeStart,dateTimeEnd,photo,published,ticketTiers,totalBookings,totalCapacity,soldOut,canceled',
    online: true,
    'dateTimeStart[gte]': Date.now(),
  });
  const handleError = useErrorHandler();

  const handleChangeQuery = (selections) => {
    setQuery({
      ...query,
      ...selections,
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ensure spinner displayed before every fetch
        setDataFetched(false);
        const response = await new API().getEvents({
          calculateEventInfo: true,
          query: { ...query, paginate: { page: currentPage, limit: 8 } },
        });

        setTotalPages(response.pages);
        setEvents(response.data);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };

    fetchEvents();
  }, [query, currentPage, setTotalPages, handleError]);

  return (
    <>
      <HomepageHero />
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
        <EventList dataFetched={dataFetched} events={events} />
        <PageControl
          page={currentPage}
          totalPages={totalPages}
          handleChange={handleChangePage}
        />
      </Container>
    </>
  );
};

export default Homepage;
