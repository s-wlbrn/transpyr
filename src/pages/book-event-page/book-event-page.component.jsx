import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../../auth/use-auth';
import { loadStripe } from '@stripe/stripe-js';

import myAxios from '../../auth/axios.config';

import { SigninOrGuestForm } from '../../components/SigninOrGuestForm/SigninOrGuestForm.component';
import { ConfirmBookingTicketCard } from './components/ConfirmBookingTicketCard/ConfirmBookingTicketCard.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

import './book-event-page.styles.scss';
import { formatPriceUSD } from '../../libs/formatPriceUSD';

const stripePromise = loadStripe(
  'pk_test_51Ibx4EH1QVoCyfVJzLIjeDhQcJ3im0gqgcVgT7cTjXKVrLyZKrYJwzJh9SROtNTemuuF3bIv7k3EqO8NFvoiK4pq005Yw7vnI0'
);

const BookEventPage = ({ match, location }) => {
  const { user } = useAuth();
  const [guest, setGuest] = useState(null);
  // const [ticketTiers, setTicketTiers] = useState(null);
  const [totals, setTotals] = useState({
    subtotal: '',
    fees: '',
    total: '',
  });
  const history = useHistory();

  useEffect(() => {
    if (location.state) {
      const subtotal = location.state.ticketKeys.reduce(
        (acc, ticket) =>
          acc +
          location.state.ticketSelections[ticket] *
            location.state.ticketTiersMap[ticket].price,
        0
      );
      const fees = subtotal * 0.03;
      const total = subtotal + fees;

      setTotals({
        subtotal: formatPriceUSD(subtotal),
        fees: formatPriceUSD(fees),
        total: formatPriceUSD(total),
      });
    } else {
      history.push(`/events/id/${match.params.id}`);
    }
  }, [location.state, match, history]);

  const handleCheckout = async (e) => {
    const booking = user
      ? {
          name: user.name,
          email: user.email,
          user: user._id,
        }
      : {
          name: guest.name,
          email: guest.email,
        };

    booking.tickets = location.state.ticketSelections;

    //get stripe.js instance
    const stripe = await stripePromise;
    //create checkout session
    const session = await myAxios().post(
      `http://localhost:3000/api/bookings/checkout-session/${match.params.id}`,
      booking
    );
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    //handle Stripe redirectToCheckout error
    if (result.error) {
      console.log('Error! ', result.error.message);
    }
  };

  return (
    <Container fluid as="main" xs={12} className="confirm-booking-page">
      {!user && !guest ? (
        <SigninOrGuestForm setGuest={setGuest} />
      ) : (
        <React.Fragment>
          <Row as="header">
            <Col xs={12}>
              <h1>Confirm your order:</h1>
              <h2>{location.state.eventName}</h2>
            </Col>
          </Row>
          <Row as="section" className="confirm-booking-cart">
            <Col xs={12}>
              <table className="confirm-booking-table">
                <thead>
                  <tr className="confirm-booking-labels">
                    <th xs={6}>Ticket Name</th>
                    <th xs={3}>Quantity</th>
                    <th xs={3}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {location.state.ticketKeys.map((ticket) => (
                    <ConfirmBookingTicketCard
                      ticket={location.state.ticketTiersMap[ticket]}
                      quantity={location.state.ticketSelections[ticket]}
                    />
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <hr />
          <Row as="section">
            <Col xs={12} className="confirm-booking-totals">
              <div className="confirm-booking-subtotal">{`Subtotal: ${totals.subtotal}`}</div>
              <div className="confirm-booking-taxes-fees">{`Service fee (3%): ${totals.fees}`}</div>
              <div className="confirm-booking-total">{`Total: ${totals.total}`}</div>
            </Col>
          </Row>
          <Row as="section">
            <Col xs={6}>
              <CustomButton
                type="button"
                onClick={() =>
                  history.push(`/events/id/${match.params.id}/tickets`)
                }
              >
                {' '}
                Cancel
              </CustomButton>
            </Col>
            <Col xs={6}>
              <CustomButton type="button" onClick={handleCheckout}>
                Submit
              </CustomButton>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default BookEventPage;
