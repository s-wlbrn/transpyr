import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';

import myAxios from '../../auth/axios.config';

import ErrorPage from '../error-page/error-page.component';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

const BookingPaymentSuccessPage = () => {
  const { search } = useLocation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  console.log(search);

  useEffect(() => {
    const createBookings = async () => {
      try {
        const bookings = await myAxios().get(
          `http://localhost:3000/api/bookings/checkout-create-booking${search}}`
        );
        console.log(bookings);
        setSuccess(true);
      } catch (err) {
        console.log(err.response);
        setError(err.response.data);
      }
    };

    createBookings();
  }, [search]);

  if (error) return <ErrorPage {...error} />;
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
