import React from 'react';
import { format, isSameDay } from 'date-fns';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { EventDetailsMap } from '../EventDetailsMap/EventDetailsMap.component';
import { EventDescription } from '../EventDescription/EventDescription.component';

import './EventDetails.styles.scss';
import { CustomButton } from '../CustomButton/CustomButton.component';

export const EventDetails = ({
  editMode = false,
  handleEditStep = null,
  name,
  type,
  category,
  convertedDescription,
  priceDisplay,
  dateTimeStart,
  dateTimeEnd,
  location,
  address,
  online,
  photo,
  handleBookNow,
  soldOut,
  published,
  pastEvent,
  canceled,
}) => (
  <React.Fragment>
    <Row>
      <Col xs={12} className="event-image-container">
        <div
          className="event-image-background"
          onClick={() => {
            if (editMode) handleEditStep('photo');
          }}
        >
          <img
            src={`http://localhost:3000/static/img/events/${photo}`}
            alt={name}
            className="event-details-image"
          />
        </div>
      </Col>
      <Col
        xs={12}
        onClick={() => {
          if (editMode) handleEditStep('name');
        }}
      >
        <p className="event-details-date">{format(dateTimeStart, 'PPPPp O')}</p>
        <h1 className="event-details-name">{name}</h1>
        {editMode && (
          <div className="event-edit-type-category">
            <span>
              <h2>Type:</h2>
              {type}
            </span>
            <span>
              <h2>Category:</h2>
              {category}
            </span>
          </div>
        )}
        <hr className="event-details-titlebreak" />
      </Col>
    </Row>
    <Row className="event-details-body">
      <Col
        xs={12}
        className="event-book-button"
        onClick={() => {
          if (editMode) {
            handleEditStep('ticketTiers');
          } else if (!soldOut && published && !pastEvent && !canceled) {
            handleBookNow();
          }
        }}
      >
        <CustomButton type="button" warning={canceled}>
          {editMode
            ? 'Ticket Types'
            : soldOut
            ? 'Sold Out'
            : !published
            ? 'Unpublished event'
            : pastEvent
            ? 'This is a past event.'
            : canceled
            ? 'Canceled'
            : 'Book now'}
        </CustomButton>
      </Col>
      <Col
        xs={12}
        onClick={() => {
          if (editMode) handleEditStep('date');
        }}
      >
        <h2>When</h2>
        {isSameDay(dateTimeStart, dateTimeEnd) ? (
          <p>
            <time dateTime={dateTimeStart}>
              {format(dateTimeStart, 'PPPP')}
            </time>
            <br />
            <time dateTime={dateTimeStart}>{format(dateTimeStart, 'p')}</time>
            <span> to </span>
            <time dateTime={dateTimeEnd}>{format(dateTimeEnd, 'p O')}</time>
          </p>
        ) : (
          <p>
            <time dateTime={dateTimeStart}>
              {format(dateTimeStart, 'PPPPp')}
            </time>
            <span> -</span>
            <br />
            <time dateTime={dateTimeEnd}>{format(dateTimeEnd, 'PPPPp')}</time>
          </p>
        )}
        {pastEvent && (
          <div className="event-details-past-event">This is a past event.</div>
        )}
      </Col>

      <Col
        xs={12}
        onClick={() => {
          if (editMode) handleEditStep('location');
        }}
      >
        <h2>Where</h2>
        {address ? (
          <React.Fragment>
            {online && <p>Online and</p>}
            <p className="event-details-address">{address}</p>
            {!editMode && <a href="#event-map">See Map</a>}
          </React.Fragment>
        ) : (
          <p className="event-details-online">This is an online event.</p>
        )}
      </Col>
      <Col
        xs={12}
        onClick={() => {
          if (editMode) handleEditStep('description');
        }}
      >
        <h2>Description</h2>
        <EventDescription convertedDescription={convertedDescription} />
      </Col>
    </Row>
    {!editMode && location.coordinates.length ? (
      <EventDetailsMap coordinates={location.coordinates} />
    ) : null}
  </React.Fragment>
);
