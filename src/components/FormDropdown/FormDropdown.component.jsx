import React from 'react';

import './FormDropdown.styles.scss';

export const FormDropdown = ({
  name,
  label,
  formId,
  handleChange,
  options,
  ...otherAttr
}) => (
  <div className="form-dropdown-group">
    {label ? (
      <label className="form-dropdown-label" htmlFor={otherAttr.id}>
        {label}
      </label>
    ) : null}

    <select
      className="form-dropdown"
      name={name}
      id={otherAttr.id}
      form={formId}
      onChange={handleChange}
      {...otherAttr}
    >
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
