import React from 'react';

import './FormInputToggle.styles.scss';

export const FormInputToggle = ({
  handleClick,
  label,
  submitting,
  ...otherAttr
}) => (
  <label className="form-input-toggle-group">
    <input
      type="checkbox"
      className="form-input-toggle"
      onClick={(e) => {
        if (!submitting) handleClick(e);
      }}
      {...otherAttr}
    />
    <span
      className={`form-input-toggle-slider ${submitting ? 'submitting' : ''}`}
    />
  </label>
);
