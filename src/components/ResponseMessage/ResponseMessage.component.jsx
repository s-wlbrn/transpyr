import React from 'react';

import './ResponseMessage.styles.scss';

export const ResponseMessage = ({ error, children }) => (
  <div className={error ? 'response-error' : 'response-message'}>
    {children}
  </div>
);
