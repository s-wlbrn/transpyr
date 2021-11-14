import React, { useCallback, useEffect, useRef, useState } from 'react';
import { addMonths, parseISO, startOfMonth } from 'date-fns';
import { useErrorHandler } from 'react-error-boundary';
import { Col, Container, Row } from 'react-bootstrap';

import { EventCalendar } from '../../components/EventCalendar/EventCalendar.component';
import { ManageEventList } from './ManageEventList/ManageEventList.component';

import './calendar-list-page.styles.scss';

const CalendarListPage = ({ manageResource, fetchEvents, card }) => {
  const [events, setEvents] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const calendarRef = useRef({});
  const listRef = useRef({});
  const handleError = useErrorHandler();

  const getMonthlyEvents = useCallback(
    async (date) => {
      try {
        const upperBound = addMonths(date, 1);
        const response = await fetchEvents({
          query: `dateTimeStart[gt]=${date}&dateTimeStart[lt]=${upperBound}&sort=dateTimeStart`,
        });
        const calendarEvents = processCalendarEvents(response);
        setEvents(calendarEvents);
      } catch (err) {
        handleError(err);
      } finally {
        setDataFetched(true);
      }
    },
    [fetchEvents, handleError]
  );
  //inital fetch with current date
  useEffect(() => {
    if (!dataFetched) {
      getMonthlyEvents(startOfMonth(Date.now()));
    }
  }, [dataFetched, getMonthlyEvents]);

  const processCalendarEvents = (events) => {
    return events.map((event) => {
      const { name, dateTimeStart, dateTimeEnd } = event;
      event.date = parseISO(dateTimeStart);
      event.title = name;
      event.dateTimeStart = new Date(dateTimeStart);
      event.dateTimeEnd = new Date(dateTimeEnd);
      return event;
    });
  };

  const handleHover = (id) => {
    calendarRef.current[id]?.classList.toggle('highlighted');
    listRef.current[id]?.classList.toggle('highlighted');
    calendarRef.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <Container fluid as="main" className="my-events-page">
      <Row as="header">
        <Col xs={12}>
          <h1 className="calendar-list-header">{`My ${manageResource}`}</h1>
          <p>{`Click on one of your ${manageResource} from the list to manage it.`}</p>
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
          <ManageEventList
            dataFetched={dataFetched}
            events={events}
            card={card}
            handleHover={handleHover}
            ref={listRef}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarListPage;
