import React from 'react';
import { StreamedImage } from '../StreamedImage/StreamedImage.component';

import './UserNamePicture.styles.scss';

export const UserNamePicture = ({ name, photo }) => {
  return (
    <span className="user-name-picture">
      <span className="top-user-name">{name}</span>
      <StreamedImage
        folder="users"
        id={photo}
        alt="user"
        className="user-name-picture-avatar"
      />
    </span>
  );
};
