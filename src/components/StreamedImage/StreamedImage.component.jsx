import React, { useEffect, useState } from 'react';
import API from '../../api';

export const StreamedImage = ({ folder, id, alt, ...otherProps }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const getImageData = async () => {
      try {
        const imageUrl = await new API().getImage(folder, id);
        setSrc(imageUrl);
      } catch (err) {
        return undefined;
      }
    };
    getImageData();
  }, [folder, id]);

  return <img src={src} alt={alt || folder} {...otherProps} />;
};
