import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import qs from 'qs';

import { CustomButton } from '../CustomButton/CustomButton.component';
import { ResponseMessage } from '../ResponseMessage/ResponseMessage.component';
import { TicketTierCard } from '../TicketTierCard/TicketTierCard.component';

import './EventBookingForm.styles.scss';

export const EventBookingForm = ({ ticketTiers, eventName, eventPath }) => {
  const [quantities, setQuantities] = useState({});
  const [response, setResponse] = useState(null);
  const ticketKeys = Object.keys(quantities);
  const ticketTiersMap = ticketKeys.reduce((acc, ticketId) => {
    const ticket = ticketTiers.find((el) => el.id === ticketId);
    return { ...acc, [ticketId]: { ...ticket } };
  }, {});

  const history = useHistory();

  const handleChange = (value, ticketId) => {
    const newQuantity = value < 0 ? 0 : value;
    setQuantities({ ...quantities, [ticketId]: Number(newQuantity) });
  };

  //how will each ticket
  //handleIncreaseQuantity
  const handleIncreaseQuantity = (ticketId) => {
    //let test = quantities[ticketId];
    const newQuantity = quantities[ticketId] ? quantities[ticketId] + 1 : 1;
    setQuantities({ ...quantities, [ticketId]: newQuantity });
  };

  //handleDecreaseQuantity
  const handleDecreaseQuantity = (ticketId) => {
    const newQuantity = quantities[ticketId] - 1;
    setQuantities({ ...quantities, [ticketId]: newQuantity });
  };

  const isValid = (tickets) => {
    for (let ticket of tickets) {
      console.log(quantities[ticket]);
      if (quantities[ticket]) return true;
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid(ticketKeys)) {
      // qs.stringify({
      //   eventName,
      //   ticketSelections: { ...quantities }
      // })

      history.push(`${eventPath}/book-event`, {
        eventName,
        ticketSelections: { ...quantities },
        ticketKeys,
        ticketTiersMap,
      });
    } else {
      setResponse('No ticket quantities specified.');
    }
  };

  const subtotal = ticketKeys.reduce((acc, ticket) => {
    const ticketTotal = quantities[ticket] * ticketTiersMap[ticket].price;
    return acc + ticketTotal;
  }, 0);

  return (
    <Container fluid className="event-booking-form">
      <Row>
        <Col xs={12}>
          <h1>Select Tickets</h1>
          <hr />
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        {ticketTiers.map((ticket) => (
          <TicketTierCard
            key={ticket.id}
            ticket={ticket}
            quantity={quantities[ticket.id]}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleChange={handleChange}
          />
        ))}
        <Row>
          <Col
            xs={12}
            className="event-booking-subtotal"
          >{`Subtotal (before tax and fees): $${subtotal}`}</Col>
        </Row>
        <Row>
          <Col xs={6}>
            <CustomButton
              type="button"
              style={{ background: 'darkred' }}
              onClick={() => history.push(eventPath)}
            >
              Cancel
            </CustomButton>
          </Col>
          <Col xs={6}>
            <CustomButton type="submit">Submit</CustomButton>
          </Col>
        </Row>
        {response && (
          <Row>
            <Col xs={12}>
              <ResponseMessage error>{response}</ResponseMessage>
            </Col>
          </Row>
        )}
      </form>
    </Container>
  );
};
