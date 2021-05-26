import React from 'react';

import './UserNamePicture.styles.scss';

export const UserNamePicture = ({ name, photo }) => {
  return (
    <span className="user-name-picture">
      <span className="top-user-name">{name}</span>
      <img src={`http://localhost:3000/static/img/users/${photo}`} alt="user" />
    </span>
  );
};
