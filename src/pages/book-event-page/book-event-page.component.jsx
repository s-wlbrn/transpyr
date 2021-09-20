import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../../auth/use-auth';
import { loadStripe } from '@stripe/stripe-js';

import API from '../../api';
import { useResponse } from '../../libs/useResponse';
import { formatPriceUSD } from '../../libs/formatPriceUSD';

import { SigninOrGuestForm } from '../../components/SigninOrGuestForm/SigninOrGuestForm.component';
import { ConfirmBookingTicketCard } from './components/ConfirmBookingTicketCard/ConfirmBookingTicketCard.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

import './book-event-page.styles.scss';
import CustomTable from '../../components/CustomTable/CustomTable.component';

const stripePromise = loadStripe(
  'pk_test_51Ibx4EH1QVoCyfVJzLIjeDhQcJ3im0gqgcVgT7cTjXKVrLyZKrYJwzJh9SROtNTemuuF3bIv7k3EqO8NFvoiK4pq005Yw7vnI0'
);

const BookEventPage = ({ match, location }) => {
  const [guest, setGuest] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [totals, setTotals] = useState({
    subtotal: '',
    fees: '',
    total: '',
  });
  const { user, token } = useAuth();
  const history = useHistory();
  const { response, createResponse } = useResponse();

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
    try {
      setLoadingCheckout(true);
      const booking = {
        name: user?.name || guest.name,
        email: user?.email || guest.email,
        tickets: location.state.ticketSelections,
      };

      //Book free event
      if (totals.total === '$0.00') {
        const bookings = await new API(token).createCheckoutSession(
          match.params.id,
          booking
        );

        return history.push(`/bookings/order/${bookings[0].orderId}`);
      }

      //get stripe.js instance
      const stripe = await stripePromise;
      //create checkout session
      const session = await new API(token).createCheckoutSession(
        match.params.id,
        booking
      );
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      //handle Stripe redirectToCheckout error
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      setLoadingCheckout(false);
      createResponse(err);
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
          <section className="confirm-booking-cart">
            <CustomTable className="confirm-booking-table" grow>
              <thead>
                <CustomTable.TableRow className="confirm-booking-labels">
                  <CustomTable.TableHeader xs={6}>
                    Ticket Name
                  </CustomTable.TableHeader>
                  <CustomTable.TableHeader xs={3} centered>
                    Quantity
                  </CustomTable.TableHeader>
                  <CustomTable.TableHeader xs={3} centered>
                    Price
                  </CustomTable.TableHeader>
                </CustomTable.TableRow>
              </thead>
              <tbody>
                {location.state.ticketKeys.map((ticket) => (
                  <ConfirmBookingTicketCard
                    ticket={location.state.ticketTiersMap[ticket]}
                    quantity={location.state.ticketSelections[ticket]}
                  />
                ))}
              </tbody>
            </CustomTable>
          </section>
          <hr />
          <Row as="section">
            <Col xs={12} className="confirm-booking-totals">
              <div className="confirm-booking-subtotal">{`Subtotal: ${totals.subtotal}`}</div>
              <div className="confirm-booking-taxes-fees">{`Service fee (3%): ${totals.fees}`}</div>
              <div className="confirm-booking-total">{`Total: ${totals.total}`}</div>
            </Col>
            <Col xs={12} className="confirm-booking-stripe-warning">
              <p>
                This app is for demonstration and uses a test implementation of
                Stripe. Use the following credit card number along with any
                future expiration date and security code:
              </p>
              <p>4242 4242 4242 4242</p>
            </Col>
          </Row>
          {loadingCheckout ? (
            <LoadingResource />
          ) : (
            <Row as="section">
              <Col xs={6}>
                <CustomButton
                  type="button"
                  onClick={() =>
                    history.push(`/events/id/${match.params.id}/tickets`)
                  }
                >
                  Cancel
                </CustomButton>
              </Col>
              <Col xs={6}>
                <CustomButton type="button" onClick={handleCheckout}>
                  Submit
                </CustomButton>
              </Col>
              <Col xs={12}>
                <ResponseMessage response={response} />
              </Col>
            </Row>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default BookEventPage;
