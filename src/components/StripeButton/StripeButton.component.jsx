import React from 'react';

import 'StripeButton.styles.scss';

export const StripeButton = ({ handleClick }) => {
  return (
    <button className="stripe-button" role="link">
      Checkout
    </button>
  );
};
