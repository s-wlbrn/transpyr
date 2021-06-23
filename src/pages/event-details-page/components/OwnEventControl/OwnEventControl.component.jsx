import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './OwnEventControl.styles.scss';

export const OwnEventControl = ({ published }) => {
  let history = useHistory();
  let location = useLocation();
  return (
    !published && (
      <Row className="own-event-control">
        <Col xs={6}>
          <p>This event is unpublished.</p>
        </Col>
        <Col xs={3}>
          <CustomButton
            type="button"
            onClick={() =>
              history.push(`${location.pathname}/edit`, {
                from: location.pathname,
              })
            }
          >
            Edit
          </CustomButton>
        </Col>
        <Col xs={3}>
          <CustomButton
            type="button"
            onClick={() =>
              history.push(`${location.pathname}/publish`, {
                from: location.pathname,
              })
            }
          >
            Publish
          </CustomButton>
        </Col>
      </Row>
    )
  );
};
