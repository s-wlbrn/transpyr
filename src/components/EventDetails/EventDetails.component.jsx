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
  handleEdit = null,
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
  id,
}) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12} className="event-image-container">
          <div
            className="event-image-background"
            onClick={() => {
              if (editMode) handleEdit('photo');
            }}
          >
            <img
              src={`http://localhost:3000/static/img/events/${id}.jpeg`}
              alt={name}
              className="event-detail-image"
            />
          </div>
        </Col>
        <Col
          xs={12}
          onClick={() => {
            if (editMode) handleEdit('name');
          }}
        >
          <p className="event-detail-date">
            {format(dateTimeStart, 'PPPPp O')}
          </p>
          <h1 className="event-detail-name">{name}</h1>
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
          <hr className="event-detail-titlebreak" />
        </Col>
      </Row>
      <Row className="event-details">
        <Col
          xs={12}
          className="event-book-button"
          onClick={() => {
            if (editMode) handleEdit('ticketTiers');
          }}
        >
          <CustomButton type="button">
            {editMode ? 'Ticket Types' : 'Book now'}
          </CustomButton>
        </Col>
        <Col
          xs={12}
          onClick={() => {
            if (editMode) handleEdit('date');
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
        </Col>

        <Col
          xs={12}
          onClick={() => {
            if (editMode) handleEdit('location');
          }}
        >
          <h2>Where</h2>
          {location.coordinates.length ? (
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
            if (editMode) handleEdit('description');
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
};
