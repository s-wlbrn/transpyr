import React from 'react';

import './LocationButton.styles.scss';

export const LocationButton = ({ name, handleChange, active }) => {
  const handleLocation = () => {
    if (name === 'Online') {
      handleChange({
        online: true,
        loc: undefined,
      });
    } else {
      navigator.geolocation.getCurrentPosition(function ({
        coords: { latitude, longitude },
      }) {
        handleChange({
          online: undefined,
          loc: { center: `${longitude},${latitude}`, radius: 50 },
        });
      });
    }
  };

  return (
    <button
      className={`${active ? 'location-button-active' : ''} location-button`}
      type="button"
      onClick={() => {
        if (!active) {
          handleLocation();
        }
      }}
    >
      {name}
    </button>
  );
};
