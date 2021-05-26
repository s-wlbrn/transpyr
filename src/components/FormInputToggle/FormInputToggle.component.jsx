import React from 'react';

import './FormInputToggle.styles.scss';

export const FormInputToggle = ({ handleClick, label, ...otherAttr }) => (
  <label className="form-input-toggle-group">
    <input
      type="checkbox"
      className="form-input-toggle"
      onClick={handleClick}
      {...otherAttr}
    />
    <span className="form-input-toggle-slider" />
  </label>
);
