import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, useRouteMatch } from 'react-router';
import { useAuth } from '../../auth/use-auth';
import myAxios from '../../auth/axios.config';
import { RefundRequestCard } from './RefundRequestCard/RefundRequestCard.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import ErrorPage from '../error-page/error-page.component';

import './RefundRequestsPage.styles.scss';
import { Link } from 'react-router-dom';

const RefundRequestsPage = ({ url }) => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const eventData = useRef({ id: null, name: '' });
  const { token } = useAuth();
  const match = useRouteMatch();
  console.log(error);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await myAxios(token).get(`${url}/${match.params.id}`);
        eventData.current = {
          id: response.data[0].event.id,
          name: response.data[0].event.name,
        };
        setBookings(response.data);
        setDataFetched(true);
      } catch (err) {
        setError(err.response.data);
        setDataFetched(true);
      }
    };
    getBookings();
  }, [match.params.id, token, url]);

  const clearRefundRequestCard = (id) => () => {
    const updatedBookings = bookings.filter((el) => {
      return el._id !== id;
    });
    setBookings(updatedBookings);
  };

  if (!dataFetched)
    return <LoadingResource>Loading cancelation requests...</LoadingResource>;
  if (error) return <ErrorPage {...error} />;

  return (
    <Container fluid as="main" className="refund-requests-page">
      <Row>
        <Col xs={12}>
          <h1>Refund Requests</h1>
          <p>{eventData.current.name}</p>
          <Route path="/bookings/refund-requests/:id">
            <Link to={`/events/id/${eventData.current.id}/refund-requests`}>
              View all cancelation requests for event
            </Link>
          </Route>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {bookings.length ? (
            bookings.map((el) => (
              <RefundRequestCard
                key={el._id}
                refundRequest={el}
                clearRefundRequestCard={clearRefundRequestCard(el._id)}
              />
            ))
          ) : (
            <div className="refund-request-none">No refund requests.</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RefundRequestsPage;
