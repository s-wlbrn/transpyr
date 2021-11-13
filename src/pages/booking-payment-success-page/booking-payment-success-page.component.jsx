import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { useErrorHandler } from 'react-error-boundary';
import TicketOverlay from '../../svg/TicketOverlay.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './booking-payment-success-page.styles.scss';

const BookingPaymentSuccessPage = ({ match }) => {
  const [bookings, setBookings] = useState([]);
  const history = useHistory();
  const handleError = useErrorHandler();
  const { user } = useAuth();

  useEffect(() => {
    const getOrderBookings = async () => {
      try {
        const bookings = await new API().getOrder(match.params.id);
        setBookings(bookings);
      } catch (err) {
        handleError(err);
      }
    };

    getOrderBookings();
  }, [match.params.id, handleError]);

  if (!bookings.length)
    return <LoadingResource page={true}>Retrieving order...</LoadingResource>;

  const { email, event } = bookings[0];
  return (
    <Container fluid as="main" className="booking-payment-success-page">
      <TicketOverlay className="booking-payment-success-overlay" />
      <Row as="section" className="booking-payment-success-message">
        <Col as="header" xs={12} className="booking-payment-success-header">
          <h1>You're all set.</h1>
          <h2>Thank you for your order!</h2>
        </Col>
        <Col xs={12}>
          <p>
            Your tickets will be emailed shortly to{' '}
            <address className="booking-payment-success-email">{email}</address>
            .
          </p>
          {user && (
            <p>
              {' '}
              If you did not receive the email, you can resend it as well as
              manage the booking from the "Manage bookings" page.
            </p>
          )}
        </Col>
      </Row>
      <nav className="booking-payment-success-links">
        <CustomButton
          type="button"
          onClick={() => history.push(`/events/id/${event}`)}
        >
          Event page
        </CustomButton>

        {user && (
          <CustomButton
            type="button"
            onClick={() => history.push('/bookings/my-bookings')}
          >
            My bookings
          </CustomButton>
        )}
      </nav>
    </Container>
  );
};

export default BookingPaymentSuccessPage;
