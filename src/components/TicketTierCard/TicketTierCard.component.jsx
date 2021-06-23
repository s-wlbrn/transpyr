import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './TicketTierCard.styles.scss';

export const TicketTierCard = ({
  ticket,
  quantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleChange,
}) => {
  const {
    id,
    tierName,
    tierDescription,
    price,
    online,
    limitPerCustomer,
    ticketSoldOut,
    canceled,
  } = ticket;

  const ticketUnavailable = (
    <Col xs={4} className="ticket-card-unavailable">
      {ticketSoldOut ? (
        <div className="ticket-card-sold-out">Sold Out</div>
      ) : (
        <div className="ticket-card-canceled">Canceled</div>
      )}
    </Col>
  );

  return (
    <Row className="ticket-tier-card">
      <Col xs={8}>
        <h1 className="ticket-card-name">{tierName}</h1>
        <div className="ticket-card-description">{`${
          online ? 'Online ticket:' : ''
        } ${tierDescription}`}</div>
        {limitPerCustomer ? <div>{`(Limit ${limitPerCustomer})`}</div> : null}
      </Col>
      {!ticketSoldOut && !canceled ? (
        <Col xs={4}>
          <div className="ticket-card-price">{`$${price}`}</div>
          <div className="quantity">
            {quantity > 0 ? (
              <div className="arrow" onClick={() => handleDecreaseQuantity(id)}>
                -
              </div>
            ) : (
              <div className="limit-quantity"></div>
            )}
            <input
              type="number"
              min={0}
              max={limitPerCustomer ? limitPerCustomer : null}
              value={quantity || 0}
              onChange={({ target: { value } }) => {
                value =
                  value > limitPerCustomer && limitPerCustomer !== 0
                    ? limitPerCustomer
                    : value;
                handleChange(value, id);
              }}
            />
            {limitPerCustomer === 0 ||
            !quantity ||
            quantity < limitPerCustomer ? (
              <div className="arrow" onClick={() => handleIncreaseQuantity(id)}>
                +
              </div>
            ) : (
              <div className="limit-quantity"></div>
            )}
          </div>
        </Col>
      ) : (
        ticketUnavailable
      )}
      <hr />
    </Row>
  );
};
