import React, { useCallback, useEffect, useRef, useState } from 'react';
import { addMonths, parseISO, startOfMonth } from 'date-fns';
import { useHistory } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { Col, Container, Row } from 'react-bootstrap';

import { EventCalendar } from '../../components/EventCalendar/EventCalendar.component';

import './calendar-list-page.styles.scss';

const CalendarListPage = ({ manageResource, fetchEvents, card }) => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef({});
  const listRef = useRef({});
  const history = useHistory();
  const handleError = useErrorHandler();

  const getMonthlyEvents = useCallback(
    async (date) => {
      try {
        const upperBound = addMonths(date, 1);
        const response = await fetchEvents({
          query: `dateTimeStart[gt]=${date}&dateTimeStart[lt]=${upperBound}&sort=dateTimeStart`,
        });
        const calendarEvents = response.map((el) => {
          // calendar expects 'date' and 'title' properties
          el.date = parseISO(el.dateTimeStart);
          el.title = el.name;
          el.dateTimeStart = new Date(el.dateTimeStart);
          el.dateTimeEnd = new Date(el.dateTimeEnd);
          return el;
        });
        setEvents(calendarEvents);
      } catch (err) {
        handleError(err);
      }
    },
    [fetchEvents, handleError]
  );

  useEffect(() => {
    getMonthlyEvents(startOfMonth(Date.now()));
  }, [getMonthlyEvents]);

  const handleHover = (id) => {
    calendarRef.current[id].classList.toggle('highlighted');
    listRef.current[id].classList.toggle('highlighted');
    calendarRef.current[id].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <Container fluid as="main" className="my-events-page">
      <Row as="header">
        <Col xs={12}>
          <h1>{`My ${manageResource}`}</h1>
        </Col>
      </Row>
      <Row className="my-events-content">
        <Col as="section" className="my-events-calendar" xs={12} lg={8}>
          <EventCalendar
            ref={calendarRef}
            getMonthlyEvents={getMonthlyEvents}
            events={events}
            handleHover={handleHover}
          />
        </Col>
        <Col as="section" className="my-events-list" xs={12} lg={4}>
          <Container as="ol" className="manage-events-list">
            {events.length ? (
              events.map((item, i) => {
                const Card = card;
                return React.cloneElement(Card, {
                  key: item._id,
                  ref: (r) => (listRef.current[item._id] = r),
                  event: item,
                  handleClick,
                  handleHover,
                });
              })
            ) : (
              <div className="manage-events-none">No events.</div>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarListPage;
