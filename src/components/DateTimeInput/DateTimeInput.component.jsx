import React from 'react';

import './DateTimeInput.styles.scss';

export const DateTimeInput = ({
  dateName,
  id,
  dateLabel,
  timeName,
  timeLabel,
  handleChange,
}) => (
  <div className="date-time-input-group">
    <label htmlFor={`${id}-date`} className="date-input-label">
      {dateLabel}
    </label>
    <input
      type="date"
      className="date-input"
      id={`${id}-date`}
      name={dateName}
      onChange={handleChange}
    />
    <label htmlFor={`${id}-time`} className="time-input-label">
      {timeLabel}
    </label>
    <input
      type="time"
      className="time-input"
      id={`${id}-time`}
      name={timeName}
      onChange={handleChange}
    />
  </div>
);
