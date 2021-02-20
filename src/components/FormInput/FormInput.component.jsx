import React from 'react';

import './FormInput.styles.scss';

export const FormInput = ({ handleChange, label, ...otherAttr }) => {
  console.log(otherAttr.value);
  return (
    <div className="form-input-group">
      <input className="form-input" onChange={handleChange} {...otherAttr} />
      {label ? (
        <label
          htmlFor={otherAttr.id}
          className={
            otherAttr.value.length
              ? 'shrink form-input-label'
              : 'form-input-label'
          }
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};
