import React, { useEffect, useState } from 'react';
import API from '../../api';

import './StreamedImage.styles.scss';

export const StreamedImage = ({
  folder,
  id,
  alt,
  width,
  className,
  ...otherProps
}) => {
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

  return src ? (
    <img
      src={src}
      alt={alt || folder}
      className={`streamed-image ${className || ''}`}
      {...otherProps}
    />
  ) : (
    <div
      className={`streamed-image-loading ${className}`}
      style={{ width: width }}
    />
  );
};
