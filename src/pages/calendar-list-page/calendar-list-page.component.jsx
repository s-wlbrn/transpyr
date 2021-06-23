import React, { useCallback, useEffect, useRef, useState } from 'react';
import { addMonths, parseISO, startOfMonth } from 'date-fns';
import { Col, Container, Row } from 'react-bootstrap';
import { EventCalendar } from '../../components/EventCalendar/EventCalendar.component';
import myAxios from '../../auth/axios.config';
import { useAuth } from '../../auth/use-auth';
import './calendar-list-page.styles.scss';
import { useHistory } from 'react-router';

const CalendarListPage = ({ manageResource, url, card }) => {
  const [events, setEvents] = useState([]);
  const { token } = useAuth();
  const calendarRef = useRef({});
  const listRef = useRef({});
  const history = useHistory();

  const getMonthlyEvents = useCallback(
    async (date) => {
      const upperBound = addMonths(date, 1);
      const response = await myAxios(token).get(
        `${url}dateTimeStart[gt]=${date}&dateTimeStart[lt]=${upperBound}`
      );
      const calendarEvents = response.data.data.map((el) => {
        // calendar expects 'date' and 'title' properties
        el.date = parseISO(el.dateTimeStart);
        el.title = el.name;
        el.dateTimeStart = new Date(el.dateTimeStart);
        el.dateTimeEnd = new Date(el.dateTimeEnd);
        return el;
      });
      setEvents(calendarEvents);
    },
    [token, url]
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
