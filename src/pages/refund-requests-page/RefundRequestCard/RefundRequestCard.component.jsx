import React, { useState } from 'react';
import { format } from 'date-fns';
import { Col, Container, Row } from 'react-bootstrap';

import API from '../../../api';
import { formatPriceUSD } from '../../../libs/formatPriceUSD';
import { useResponse } from '../../../libs/useResponse';

import { useAuth } from '../../../auth/use-auth';
import { ResponseMessage } from '../../../components/ResponseMessage/ResponseMessage.component';
import { LoadingResource } from '../../../components/LoadingResource/LoadingResource.component';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';

import './RefundRequestCard.styles.scss';

export const RefundRequestCard = ({
  refundRequest,
  clearRefundRequestCard,
}) => {
  const [cleared, setCleared] = useState(false);
  const { response, createResponse } = useResponse();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleResolveRequest = async (status) => {
    try {
      setLoading(true);
      await new API(token).resolveRefundRequest(refundRequest._id, status);
      setCleared(true);
      setTimeout(() => {
        clearRefundRequestCard();
      }, 150);
    } catch (err) {
      setLoading(false);
      createResponse(err);
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
        {loading ? (
          <Col xs={6} className="refund-request-card-loading">
            <LoadingResource />
          </Col>
        ) : (
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
        )}
      </Row>
      <Row className="refund-request-card-tickets">
        <Col as="ul" xs={12} md={6}>
          <div className="refund-request-card-label">Tickets:</div>
          {refundRequest.tickets.map((ticket, i) => (
            <li key={i} className="refund-request-card-ticket-data">
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
          ))}
        </Col>
        {refundRequest.reason && (
          <Col xs={12} md={6}>
            <div className="refund-request-card-label">Cancelation reason:</div>
            <div>{refundRequest.reason}</div>
          </Col>
        )}
      </Row>
      <Row>
        <Col xs={12}>
          <ResponseMessage response={response} />
        </Col>
      </Row>
    </Container>
  );
};
