import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useRouteMatch } from 'react-router';
import { IoCheckmark } from 'react-icons/io5';
import { useErrorHandler } from 'react-error-boundary';
import { isPast } from 'date-fns';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import { useResponse } from '../../libs/useResponse';
import { formatPriceUSD } from '../../libs/formatPriceUSD';
import { validationSchema } from './CancelBookingModal/CancelBooking.schema';

import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import CustomTable from '../../components/CustomTable/CustomTable.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { ResponseMessage } from '../../components/ResponseMessage/ResponseMessage.component';
import { CancelBookingModal } from './CancelBookingModal/CancelBookingModal.component';

import './manage-booking-page.styles.scss';

const ManageBookingPage = () => {
  const [bookings, setBookings] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelationReason, setCancelationReason] = useState('');
  const [selected, setSelected] = useState({});
  const { token } = useAuth();
  const match = useRouteMatch();
  const handleError = useErrorHandler();
  const { response, createResponse, clearResponse } = useResponse();

  const getBookings = useCallback(async () => {
    try {
      const response = await new API(token).getMyBookings(
        `event=${match.params.id}&sort=refundRequest -price`
      );
      setBookings(response);
      setDataFetched(true);
    } catch (err) {
      handleError(err);
    }
  }, [match.params.id, token, handleError]);

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
        [cur.id]: value,
      }),
      {}
    );
    setSelected(allSelected);
  };

  const validateSelections = () => {
    for (const key of selectedIdsArray) {
      if (bookings.find((el) => el.id === key).refundRequest) return false;
    }
    return true;
  };

  const handleShowModal = () => {
    if (!selectedIdsArray.length) {
      createResponse(new Error('No bookings are selected.'));
    } else if (!validateSelections()) {
      createResponse(
        new Error('A selected booking already has a cancelation request.')
      );
    } else {
      clearResponse();
      setShowModal(true);
    }
  };

  const handleClearModal = () => {
    clearResponse();
    setShowModal(false);
  };

  const handleRequestRefund = async () => {
    try {
      if (cancelationReason) {
        await validationSchema.validate({ cancelationReason });
      }
      await new API(token).requestRefund(bookings[0].event.id, {
        selectedIdsArray,
        cancelationReason,
      });

      handleClearModal();
      setSelected({});
      getBookings();
    } catch (err) {
      createResponse(err);
    }
  };

  if (!dataFetched)
    return <LoadingResource>Loading bookings...</LoadingResource>;

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
        {!isPast(new Date(bookings[0].event.dateTimeStart)) && (
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
                    onClick={() => toggleSelected(el.id)}
                    selected={selected[el.id]}
                  >
                    <CustomTable.TableData xs={1} centered>
                      {selected[el.id] ? <IoCheckmark /> : null}
                    </CustomTable.TableData>
                    <CustomTable.TableData xs={7}>
                      {el.ticketData.tierName}
                      {el.refundRequest && (
                        <div className="manage-booking-table-refund-requested">
                          {el.refundRequest.status === 'rejected'
                            ? 'Refund request rejected'
                            : 'Refund requested'}
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
            {!showModal && <ResponseMessage response={response} />}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ManageBookingPage;
