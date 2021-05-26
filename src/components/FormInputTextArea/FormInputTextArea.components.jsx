import React from 'react';

import './FormInputTextArea.styles.scss';

export const FormInputTextArea = ({ handleChange, label, ...otherAttr }) => (
  <div className="form-text-area-group">
    {label && (
      <label htmlFor={otherAttr.id} className="form-text-area-label">
        {label}
      </label>
    )}
    <textarea
      className="form-text-area"
      onChange={handleChange}
      {...otherAttr}
    />
  </div>
);
