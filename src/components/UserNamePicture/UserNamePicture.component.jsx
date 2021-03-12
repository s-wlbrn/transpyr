import React from 'react';

import './UserNamePicture.styles.scss';

export const UserNamePicture = ({ name, img }) => (
  <span className="user-name-picture">
    {name}
    <img src="http://localhost:3001/default.jpg" alt="" />
  </span>
);
