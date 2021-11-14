import React, { memo, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { Modal, Row, Col } from 'react-bootstrap';
import {
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoLocationOutline,
} from 'react-icons/io5';

import { EventDetailsMap } from '../EventDetailsMap/EventDetailsMap.component';
import { EventDescription } from '../EventDescription/EventDescription.component';
import { CustomButton } from '../CustomButton/CustomButton.component';
import { StreamedImage } from '../StreamedImage/StreamedImage.component';

import './EventDetails.styles.scss';

export const EventDetails = memo(
  ({
    editMode = false,
    handleEditStep,
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
    organizer,
  }) => {
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const eventBookable = !soldOut && published && !pastEvent && !canceled;
    return (
      <section className="event-listing">
        <Modal
          show={showPhotoModal}
          size="lg"
          onHide={() => setShowPhotoModal(false)}
          className="event-photo-modal"
        >
          <Modal.Header closeButton>
            <h1>Event photo</h1>
          </Modal.Header>
          <Modal.Body>
            <StreamedImage
              folder="events"
              id={photo}
              alt="event"
              className="modal-photo"
              width="100%"
              onClick={() => setShowPhotoModal(false)}
            />
          </Modal.Body>
        </Modal>
        <Row as="header" className="event-details-header">
          <Col xs={12} md={6} className="event-image-container">
            <div
              className="event-image-background"
              onClick={() => {
                if (editMode) {
                  handleEditStep('photo');
                } else {
                  setShowPhotoModal(true);
                }
              }}
            >
              <StreamedImage
                folder="events"
                id={photo}
                alt={name}
                className="event-header-image"
              />
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            onClick={() => {
              if (editMode) handleEditStep('name');
            }}
          >
            <time dateTime={dateTimeStart} className="event-header-date">
              {format(dateTimeStart, 'PPPPp O')}
            </time>
            <h1 className="event-header-name">{name}</h1>
            <p>
              Presented by{' '}
              <Link to={`/users/id/${organizer.id}`}>{organizer.name}</Link>
            </p>
            <div className="event-header-price-display">{priceDisplay}</div>
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
          </Col>
        </Row>
        <Col
          xs={12}
          className={`event-book-button ${
            eventBookable ? 'book-button-sticky' : ''
          }`}
          onClick={() => {
            if (editMode) {
              handleEditStep('ticketTiers');
            } else if (eventBookable) {
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
        <Row as="section" className="event-details-body">
          <Col
            xs={12}
            as="section"
            onClick={() => {
              if (editMode) handleEditStep('description');
            }}
          >
            <header>
              <IoDocumentTextOutline /> <h2>Description</h2>
            </header>
            <EventDescription convertedDescription={convertedDescription} />
          </Col>
          <Col
            xs={12}
            as="section"
            onClick={() => {
              if (editMode) handleEditStep('date');
            }}
          >
            <header>
              <IoCalendarOutline /> <h2>When</h2>
            </header>

            {isSameDay(dateTimeStart, dateTimeEnd) ? (
              <p>
                <time dateTime={dateTimeStart}>
                  {format(dateTimeStart, 'PPPP')}
                </time>
                <br />
                <time dateTime={dateTimeStart}>
                  {format(dateTimeStart, 'p')}
                </time>
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
                <time dateTime={dateTimeEnd}>
                  {format(dateTimeEnd, 'PPPPp')}
                </time>
              </p>
            )}
            {pastEvent && (
              <div className="event-details-past-event">
                This is a past event.
              </div>
            )}
          </Col>

          <Col
            xs={12}
            as="section"
            onClick={() => {
              if (editMode) handleEditStep('location');
            }}
          >
            <header>
              <IoLocationOutline /> <h2>Where</h2>
            </header>

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
        </Row>
        {!editMode && location.coordinates.length ? (
          <EventDetailsMap coordinates={location.coordinates} />
        ) : (
          <React.Fragment />
        )}
      </section>
    );
  }
);
