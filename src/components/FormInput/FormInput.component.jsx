import React from 'react';
import CurrencyInput from 'react-currency-input-field';

import './FormInput.styles.scss';

export const FormInput = ({
  handleChange,
  label,
  disabled,
  type,
  ...otherAttr
}) => {
  return (
    <div className="form-input-group">
      {type === 'currency' ? (
        <CurrencyInput
          className="form-input"
          decimalsLimit={2}
          allowNegativeValue={false}
          onValueChange={(value, name) =>
            handleChange({ target: { name, value } })
          }
          {...otherAttr}
        />
      ) : (
        <input
          className="form-input"
          onChange={handleChange}
          disabled={disabled}
          type={type}
          {...otherAttr}
        />
      )}
      {label ? (
        <label
          htmlFor={otherAttr.id}
          className={
            typeof otherAttr.value === 'number' || otherAttr.value
              ? 'shrink form-input-label'
              : 'form-input-label'
          }
        >
          {label}
        </label>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};
