import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import PhotoUploadForm from '../../components/PhotoUploadForm/PhotoUploadForm.component';

import './upload-event-photo-page.styles.scss';

const UploadEventPhotoPage = ({ match }) => {
  const history = useHistory();

  const handlePhotoUploadSuccess = () => {
    history.push(`/events/id/${match.params.id}`);
  };

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
            resourceId={match.params.id}
            successCallback={handlePhotoUploadSuccess}
            cancel={() => history.goBack()}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UploadEventPhotoPage;
