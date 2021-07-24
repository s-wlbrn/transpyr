import React from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserProfileImage } from '../../../../components/UserProfileImage/UserProfileImage.component';

import './AboutOrganizer.styles.scss';

export const AboutOrganizer = ({ organizer: { name, tagline, id, photo } }) => {
  const history = useHistory();

  return (
    <Row
      as="section"
      className="about-organizer-section"
      onClick={() => history.push(`/users/id/${id}`)}
    >
      <hr />
      <UserProfileImage id={photo} />
      <h2>{name}</h2>
      <h3>Organizer</h3>
      <p>{tagline ? tagline : 'Click for more information.'}</p>
    </Row>
  );
};
