import React, { useState } from 'react';
import { format } from 'date-fns';
import { Col, Container, Row } from 'react-bootstrap';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';

import './RefundRequestCard.styles.scss';
import { formatPriceUSD } from '../../../libs/formatPriceUSD';
import myAxios from '../../../auth/axios.config';
import { useAuth } from '../../../auth/use-auth';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';

export const RefundRequestCard = ({
  refundRequest,
  clearRefundRequestCard,
}) => {
  const [cleared, setCleared] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    message: null,
  });
  const { token } = useAuth();

  const handleResolveRequest = async (status) => {
    try {
      await myAxios(token).patch(
        `http://localhost:3000/api/bookings/refund-request/${refundRequest._id}?status=${status}`
      );
      setCleared(true);
      setTimeout(() => {
        clearRefundRequestCard();
      }, 150);
    } catch (err) {
      setResponse({
        error: true,
        message: err.response.data.message,
      });
    }
  };

  return (
    <Container className={`refund-request-card${cleared ? ' cleared' : ''}`}>
      <Row>
        <Col xs={6} className="refund-request-card-info">
          <div>
            <span className="refund-request-card-label">Requested:</span>
            <span className="refund-request-card-value">
              {format(new Date(refundRequest.createdAt), 'PPPp')}
            </span>
          </div>
          <div>
            <span className="refund-request-card-label">Name:</span>
            <span className="refund-request-card-value">
              {refundRequest.name}
            </span>
          </div>
          <div>
            <span className="refund-request-card-label">Email:</span>
            <span className="refund-request-card-value">
              {refundRequest.email}
            </span>
          </div>
        </Col>
        <Col xs={6} className="refund-request-card-buttons">
          <CustomButton
            type="button"
            onClick={() => handleResolveRequest('accepted')}
          >
            Accept
          </CustomButton>
          <CustomButton
            type="button"
            warning
            onClick={() => handleResolveRequest('rejected')}
          >
            Deny
          </CustomButton>
        </Col>
      </Row>
      <Row className="refund-request-card-tickets">
        <Col xs={12}>
          <h2 className="refund-request-card-label">Tickets:</h2>
        </Col>
        {refundRequest.tickets.map((ticket, i) => (
          <Col
            key={i}
            as="ul"
            xs={12}
            className="refund-request-card-ticket-data"
          >
            <li>
              <div>
                <span className="refund-request-card-label">Type:</span>
                <span className="refund-request-card-value">
                  {ticket.ticket.tierName}
                </span>
              </div>
              <div>
                <span className="refund-request-card-label">Amount Paid:</span>
                <span className="refund-request-card-value">
                  {formatPriceUSD(ticket.price)}
                </span>
              </div>
            </li>
          </Col>
        ))}
      </Row>
      {response.message && (
        <Row>
          <Col xs={12}>
            <ResponseMessage error={response.error}>
              {response.message}
            </ResponseMessage>
          </Col>
        </Row>
      )}
    </Container>
  );
};
