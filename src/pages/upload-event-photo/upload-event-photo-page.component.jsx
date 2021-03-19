import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PhotoUploadForm from '../../components/PhotoUploadForm/PhotoUploadForm.component';

import './upload-event-photo-page.styles.scss';

const UploadEventPhotoPage = (props) => {
  return (
    <Container as="main" fluid className="upload-event-photo-page">
      <Row>
        <Col xs={12}>
          <h1 className="upload-event-photo-title">
            Upload a photo for the event.
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PhotoUploadForm
            resource="events"
            resourceId={props.match.params.id}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UploadEventPhotoPage;
