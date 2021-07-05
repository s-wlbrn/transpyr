import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import myAxios from '../../auth/axios.config';
import { formatPriceUSD } from '../../libs/formatPriceUSD';
import { useAuth } from '../../auth/use-auth';
import AppError from '../../libs/AppError';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { ManageTicketTable } from './components/ManageTicketTable.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { ManageTicketModal } from './components/ManageTicketModal.component';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal.component';

import './manage-event-page.styles.scss';

const ManageEventPage = () => {
  const [event, setEvent] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [manageTicketIndex, setManageTicketIndex] = useState(null);
  const [hasRefundRequests, setHasRefundRequests] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const { user, token } = useAuth();
  const handleError = useErrorHandler();

  //get event
  useEffect(() => {
    const fetchEventAndCheckAuth = async () => {
      try {
        const response = await myAxios().get(
          `http://localhost:3000/api/events/${match.params.id}`
        );
        const event = response.data.data;

        //handle unauthorized
        if (user._id !== event.organizer) {
          handleError(
            new AppError('You are not the organizer of this event.', 403)
          );
        } else if (!event.published)
          history.push(`/events/id/${match.params.id}/publish`);
        //handle canceled
        // if (event.canceled)
        //   //error canceled event
        setEvent(event);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };

    if (user._id) fetchEventAndCheckAuth();
  }, [match.params.id, history, user._id, handleError]);

  //get refund requests
  useEffect(() => {
    const getRefundRequests = async () => {
      try {
        const response = await myAxios(token).get(
          `http://localhost:3000/api/bookings/refund-requests/event/${match.params.id}`
        );
        if (response.data.length) {
          setHasRefundRequests(true);
        }
      } catch (err) {
        console.log("Couldn't get refund requests: ", err.message);
      }
    };
    getRefundRequests();
  }, [match.params.id, token]);

  const ticketSalesInfo = useMemo(() => {
    if (!event) return null;
    const totalTicketSales = event.ticketTiers.reduce(
      (acc, curr) => acc + curr.price * curr.numBookings.length,
      0
    );
    const serviceFee =
      event.feePolicy === 'absorbFee' ? totalTicketSales * 0.03 : 0;
    return {
      totalTicketSales: formatPriceUSD(totalTicketSales),
      serviceFee: formatPriceUSD(serviceFee),
      estimatedEarnings: formatPriceUSD(totalTicketSales - serviceFee),
    };
  }, [event]);

  const cancelTicketDisplay = (index) => {
    const eventCopy = { ...event };
    eventCopy.ticketTiers[manageTicketIndex].canceled = true;
    setEvent(eventCopy);
  };

  const checkActiveTickets = () => {
    return event.ticketTiers.reduce((acc, cur) => {
      return !cur.canceled ? acc + 1 : acc;
    }, 0);
  };

  if (!dataFetched) return <LoadingResource>Loading event...</LoadingResource>;

  return (
    <Container fluid as="main" className="manage-event-page">
      <Route path={`${match.path}/cancel`}>
        <ConfirmDeleteModal />
      </Route>
      {typeof manageTicketIndex === 'number' ? (
        <ManageTicketModal
          ticket={event.ticketTiers[manageTicketIndex]}
          clearTicket={() => setManageTicketIndex(null)}
          cancelTicketDisplay={cancelTicketDisplay}
          checkActiveTickets={checkActiveTickets}
        />
      ) : null}
      <Row as="header">
        <Col xs={12}>
          <h1>{`Managing "${event.name}"`}</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Alert
            show={hasRefundRequests}
            variant="danger"
            className="manage-event-refund-request-alert"
          >
            <Alert.Heading>
              This event has outstanding refund requests.
            </Alert.Heading>
            <Link to={`/events/id/${match.params.id}/manage/refund-requests`}>
              View refund requests for this event
            </Link>
          </Alert>
        </Col>
      </Row>
      <Row className="manage-event-info">
        <Col xs={12} md={6} as="section" className="manage-event-tickets">
          <h2>Tickets</h2>
          <p>Click to manage a ticket.</p>
          <Container className="manage-event-table-container">
            <ManageTicketTable
              ticketTiers={event.ticketTiers}
              handleClick={setManageTicketIndex}
            />
          </Container>
        </Col>
        <Col xs={12} md={6} as="section" className="manage-event-sales">
          <h2>Sales</h2>
          <div>
            <div>
              <span className="manage-event-sales-label">Total bookings:</span>
              <span className="manage-event-sales-value">
                {event.totalBookings}
              </span>
            </div>
            {event.feePolicy === 'absorbFee' ? (
              <React.Fragment>
                <div>
                  <span className="manage-event-sales-label">
                    Total ticket sales:
                  </span>
                  <span className="manage-event-sales-value">
                    {ticketSalesInfo.totalTicketSales}
                  </span>
                </div>
                <div>
                  <span className="manage-event-sales-label">Service fee:</span>
                  <span className="manage-event-sales-value">
                    {ticketSalesInfo.serviceFee}
                  </span>
                </div>
              </React.Fragment>
            ) : null}
            <div className="manage-event-sales-earnings">
              <span>Estimated earnings:</span>
              <span className="manage-event-sales-value">
                {ticketSalesInfo.estimatedEarnings}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="manage-event-nav-buttons">
        <Col xs={6}>
          <CustomButton
            type="button"
            onClick={() => history.push(`/events/my-events`)}
          >
            Back to My Events
          </CustomButton>
        </Col>
        <Col xs={6}>
          <CustomButton
            type="button"
            onClick={() => history.push(`/events/id/${match.params.id}/edit`)}
          >
            Edit Event
          </CustomButton>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CustomButton
            type="button"
            warning
            onClick={() => history.push(`${match.url}/cancel`)}
          >
            Cancel Event
          </CustomButton>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageEventPage;
