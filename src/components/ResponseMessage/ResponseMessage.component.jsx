import React from 'react';

import './ResponseMessage.styles.scss';

export const ResponseMessage = ({ response = {} }) => {
  const { message, error } = response;
  return message ? (
    <div
      className={`response ${error ? 'response-error' : 'response-message'}`}
    >
      {message}
    </div>
  ) : (
    <React.Fragment />
  );
};
