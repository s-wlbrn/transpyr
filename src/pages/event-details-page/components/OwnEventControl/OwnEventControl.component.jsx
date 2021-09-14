import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './OwnEventControl.styles.scss';

export const OwnEventControl = ({
  event: { published, dateTimeStart, canceled },
}) => {
  const history = useHistory();
  const location = useLocation();
  return dateTimeStart > Date.now() && !canceled ? (
    <Row className="own-event-control">
      <Col xs={6}>
        {!published ? (
          <p>This event is unpublished.</p>
        ) : (
          <p>This is your event.</p>
        )}
      </Col>
      <Col xs={6}>
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
        {!published && (
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
        )}
      </Col>
    </Row>
  ) : (
    <React.Fragment />
  );
};
