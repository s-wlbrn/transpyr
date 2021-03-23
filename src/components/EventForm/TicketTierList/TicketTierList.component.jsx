import React from 'react';

import './TicketTierList.styles.scss';

export const TicketTierList = ({ tierList, tierToEdit, toggleEditMode }) => (
  <div className="tier-list-container">
    <ul className="tier-list">
      {tierList.length ? (
        tierList.map((tier, i) => (
          <li
            className={`${
              tierToEdit === tier.tierName ? 'tier-edit' : ''
            } tier-list-item`}
            key={i}
            onClick={() => toggleEditMode(tier)}
          >
            {tier.tierName}
          </li>
        ))
      ) : (
        <div className="tier-list-empty">No ticket types.</div>
      )}
    </ul>
  </div>
);
