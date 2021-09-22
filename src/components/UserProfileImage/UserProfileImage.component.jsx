import React, { useEffect, useState } from 'react';
import API from '../../api';

import './UserProfileImage.styles.scss';

export const UserProfileImage = ({ id }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const getImage = async () => {
      try {
        const imageUrl = await new API().getImage('users', id);
        setSrc(imageUrl);
      } catch (err) {
        return undefined;
      }
    };
    getImage();
  }, [id]);

  return (
    <div
      className="user-profile-image-container"
      style={
        src
          ? {
              backgroundImage: `url(${src})`,
            }
          : { backgroundColor: 'lightgray' }
      }
    />
  );
};
