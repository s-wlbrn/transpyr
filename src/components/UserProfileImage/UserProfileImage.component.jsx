import React from 'react';

import './UserProfileImage.styles.scss';

export const UserProfileImage = ({ id }) => (
  <img
    className="user-profile-image"
    src={`http://localhost:3000/static/img/users/${id}`}
    alt="user"
  />
);
