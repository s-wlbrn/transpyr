import React from 'react';

import './PageControl.styles.scss';

export const PageControl = ({ page, totalPages, handleChange }) => {
  return (
    <div className="page-control">
      {page > 1 ? (
        <div className="page-control-back">
          <span className="page-control-first" onClick={() => handleChange(1)}>
            {'<<'}
          </span>
          <span
            className="page-control-prev"
            onClick={() => handleChange(page - 1)}
          >
            {'< Previous'}
          </span>
        </div>
      ) : (
        <div className="page-control-hidden" />
      )}
      <div className="page-control-page">{`${page} of ${totalPages}`}</div>
      {page < totalPages ? (
        <div className="page-control-forward">
          <span
            className="page-control-next"
            onClick={() => handleChange(page + 1)}
          >
            Next >
          </span>
          <span
            className="page-control-last"
            onClick={() => handleChange(totalPages)}
          >
            {'>>'}
          </span>
        </div>
      ) : (
        <div className="page-control-hidden" />
      )}
    </div>
  );
};
