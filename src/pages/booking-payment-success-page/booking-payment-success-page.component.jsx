import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';

import API from '../../api';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { useErrorHandler } from 'react-error-boundary';

const BookingPaymentSuccessPage = () => {
  const { search } = useLocation();
  const [success, setSuccess] = useState(false);
  const handleError = useErrorHandler();

  useEffect(() => {
    const createCheckoutBookings = async () => {
      try {
        await new API().createBookings(search);
        setSuccess(true);
      } catch (err) {
        handleError(err);
      }
    };

    createCheckoutBookings();
  }, [search, handleError]);

  if (!success)
    return <LoadingResource>Processing bookings...</LoadingResource>;
  return (
    <Container fluid as="main" className>
      <Row>
        <Col xs={12}>Success!</Col>
      </Row>
    </Container>
  );
};

export default BookingPaymentSuccessPage;
