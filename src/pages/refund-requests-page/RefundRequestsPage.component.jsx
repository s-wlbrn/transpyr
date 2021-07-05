import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuth } from '../../auth/use-auth';
import myAxios from '../../auth/axios.config';

import { RefundRequestCard } from './RefundRequestCard/RefundRequestCard.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './RefundRequestsPage.styles.scss';
import { useErrorHandler } from 'react-error-boundary';

const RefundRequestsPage = ({ url }) => {
  const [bookings, setBookings] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const eventData = useRef({ id: null, name: '' });
  const { token } = useAuth();
  const match = useRouteMatch();
  const history = useHistory();
  const handleError = useErrorHandler();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await myAxios(token).get(`${url}/${match.params.id}`);
        if (response.data.length) {
          eventData.current = {
            id: response.data[0].event.id,
            name: response.data[0].event.name,
          };
        }
        setBookings(response.data);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };
    getBookings();
  }, [match.params.id, token, url, handleError]);

  const clearRefundRequestCard = (id) => () => {
    const updatedBookings = bookings.filter((el) => {
      return el._id !== id;
    });
    setBookings(updatedBookings);
  };

  if (!dataFetched)
    return <LoadingResource>Loading refund requests...</LoadingResource>;

  return (
    <Container fluid as="main" className="refund-requests-page">
      <Row as="header">
        <Col xs={12}>
          <h1>Refund Requests</h1>
          <p>{eventData.current.name}</p>
          <Route path="/bookings/refund-requests/:id">
            {eventData.current.id && (
              <Link
                to={`/events/id/${eventData.current.id}/manage/refund-requests`}
              >
                View all refund requests for event
              </Link>
            )}
          </Route>
        </Col>
      </Row>
      <Row as="section" className="refund-requests-list">
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
            <div className="refund-requests-none">No refund requests.</div>
          )}
        </Col>
      </Row>
      {eventData.current.id && (
        <Row>
          <Col xs={6}>
            <CustomButton
              type="button"
              onClick={() =>
                history.push(`/events/id/${eventData.current.id}/manage`)
              }
            >
              Manage Event
            </CustomButton>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RefundRequestsPage;
