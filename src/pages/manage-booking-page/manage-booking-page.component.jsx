import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';
import { IoCheckmark } from 'react-icons/io5';

import myAxios from '../../auth/axios.config';
import { useAuth } from '../../auth/use-auth';
import { formatPriceUSD } from '../../libs/formatPriceUSD';
import ErrorPage from '../error-page/error-page.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import CustomTable from '../../components/CustomTable/CustomTable.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { CancelBookingModal } from './CancelBookingModal/CancelBookingModal.component';

import './manage-booking-page.styles.scss';

const ManageBookingPage = () => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelationReason, setCancelationReason] = useState('');
  const [response, setResponse] = useState({
    error: false,
    message: null,
  });
  const [selected, setSelected] = useState({});
  const { token } = useAuth();
  const match = useRouteMatch();

  //move to useResponse hook
  const clearResponse = () => {
    setResponse({
      error: false,
      message: null,
    });
  };

  const getBookings = useCallback(async () => {
    try {
      const response = await myAxios(token).get(
        `http://localhost:3000/api/bookings/me?event=${match.params.id}&sort=refundRequest -price`
      );
      setBookings(response.data);
      setDataFetched(true);
    } catch (err) {
      setError(err.response.data);
      setDataFetched(true);
    }
  }, [match.params.id, token]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const selectedIdsArray = useMemo(
    () => Object.keys(selected).filter((id) => selected[id]),
    [selected]
  );

  const toggleSelected = (id) => {
    setSelected({ ...selected, [id]: selected[id] ? undefined : true });
  };

  const changeSelectionAll = (value) => {
    const allSelected = bookings.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.id]: !cur.refundRequest ? value : undefined,
      }),
      {}
    );
    setSelected(allSelected);
  };

  const handleShowModal = () => {
    if (selectedIdsArray.length) {
      clearResponse();
      setShowModal(true);
    } else {
      setResponse({ error: true, message: 'No bookings are selected.' });
    }
  };

  const handleClearModal = () => {
    //clear response
    setShowModal(false);
  };

  const handleRequestRefund = async () => {
    try {
      await myAxios(token).patch(
        `http://localhost:3000/api/bookings/refund-request/event/${bookings[0].event.id}`,
        { selectedIdsArray, cancelationReason }
      );
      handleClearModal();
      setSelected({});
      getBookings();
    } catch (err) {
      setResponse({
        error: true,
        message: err.response.message,
      });
    }
  };

  if (!dataFetched)
    return <LoadingResource>Loading bookings...</LoadingResource>;
  if (error) return <ErrorPage {...error} />;

  return (
    <Container fluid as="main" className="manage-booking-page">
      <CancelBookingModal
        showModal={showModal}
        response={response}
        cancelationReason={cancelationReason}
        handleChangeReason={(e) => setCancelationReason(e.target.value)}
        refundPolicy={bookings[0].event.refundPolicy}
        clearModal={handleClearModal}
        requestRefund={handleRequestRefund}
      />
      <Row as="header">
        <Col xs={12}>
          <h1>Manage booking:</h1>
          <p>{bookings[0].event.name}</p>
        </Col>
      </Row>
      <Row as="section" className="manage-booking-content">
        <Col xs={12} md={6}>
          <h2>Order Information</h2>
          <div>
            <span className="manage-booking-label">Name:</span>
            <span className="manage-booking-value">{bookings[0].name}</span>
          </div>
          <div>
            <span className="manage-booking-label">Email:</span>
            <span className="manage-booking-value">{bookings[0].email}</span>
          </div>
          <div>
            <span className="manage-booking-label">Number of bookings:</span>
            <span className="manage-booking-value">{bookings.length}</span>
          </div>
          <div>
            <span className="manage-booking-label">Total price:</span>
            <span className="manage-booking-value">
              {formatPriceUSD(
                bookings.reduce((acc, cur) => acc + cur.price, 0)
              )}
            </span>
          </div>
        </Col>
        <Col xs={12} md={6} className="manage-booking-bookings">
          <h2>Bookings</h2>
          <p>
            Select a booking below to request a refund or resend the ticket
            email.
          </p>
          <div className="manage-booking-select-buttons">
            <CustomButton
              type="button"
              onClick={() => changeSelectionAll(undefined)}
            >
              Select None
            </CustomButton>
            <CustomButton
              type="button"
              onClick={() => changeSelectionAll(true)}
            >
              Select All
            </CustomButton>
          </div>
          <CustomTable className="manage-booking-table" border grow>
            <thead>
              <CustomTable.TableRow>
                <CustomTable.TableData xs={1}></CustomTable.TableData>
                <CustomTable.TableData xs={7}>Ticket</CustomTable.TableData>
                <CustomTable.TableData xs={4} centered>
                  Price
                </CustomTable.TableData>
              </CustomTable.TableRow>
            </thead>
            <tbody>
              {bookings.map((el) => (
                <CustomTable.TableRow
                  key={el.id}
                  onClick={() => {
                    if (!el.refundRequest) toggleSelected(el.id);
                  }}
                  selected={selected[el.id]}
                >
                  <CustomTable.TableData xs={1} centered>
                    {selected[el.id] ? <IoCheckmark /> : null}
                  </CustomTable.TableData>
                  <CustomTable.TableData xs={7}>
                    {el.ticketData.tierName}
                    {el.refundRequest && (
                      <div className="manage-booking-table-refund-requested">
                        Refund requested
                      </div>
                    )}
                  </CustomTable.TableData>
                  <CustomTable.TableData xs={4} centered>
                    {formatPriceUSD(el.price)}
                  </CustomTable.TableData>
                </CustomTable.TableRow>
              ))}
            </tbody>
          </CustomTable>
          <div className="manage-booking-controls">
            <CustomButton type="button">Resend Tickets</CustomButton>
            <CustomButton type="button" onClick={handleShowModal} warning>
              Request Refund
            </CustomButton>
          </div>
          {response.message && (
            <ResponseMessage error={response.error}>
              {response.message}
            </ResponseMessage>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ManageBookingPage;
