import React from 'react';

import './PageControl.styles.scss';

export const PageControl = ({ page, totalPages, handleChange }) => {
  return !totalPages ? (
    <React.Fragment />
  ) : (
    <div className="page-control">
      {page > 1 ? (
        <div className="page-control-back">
          <button
            className="page-control-first"
            onClick={() => handleChange(1)}
          >
            {'<<'}
          </button>
          <button
            className="page-control-prev"
            onClick={() => handleChange(page - 1)}
          >
            {'< Previous'}
          </button>
        </div>
      ) : (
        <div className="page-control-hidden" />
      )}
      <div className="page-control-page">{`${page} of ${totalPages}`}</div>
      {page < totalPages ? (
        <div className="page-control-forward">
          <button
            className="page-control-next"
            onClick={() => handleChange(page + 1)}
          >
            Next >
          </button>
          <button
            className="page-control-last"
            onClick={() => handleChange(totalPages)}
          >
            {'>>'}
          </button>
        </div>
      ) : (
        <div className="page-control-hidden" />
      )}
    </div>
  );
};
