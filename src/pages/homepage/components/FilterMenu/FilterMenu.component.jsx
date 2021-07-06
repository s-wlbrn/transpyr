import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { dateMenuMap, menuItems } from './filterMenu.data';

import './FilterMenu.styles.scss';

export const FilterMenu = ({ query, handleChange }) => {
  const [selections, setSelections] = useState({});

  const isSelected = (type, item) => {
    if (item) {
      return selections[type] === item;
    }
    return !!selections[type];
  };

  const handleClear = (type) => {
    if (type === 'date') {
      handleChange({
        'dateTimeStart[gte]': Date.now(),
        'dateTimeStart[lte]': undefined,
      });
    } else {
      handleChange({ [type]: undefined });
    }
    setSelections({ ...selections, [type]: undefined });
  };

  const handleToggle = (type, item) => {
    if (isSelected(type, item)) {
      return handleClear(type);
    } else if (type === 'date') {
      setSelections({ ...selections, date: item });
      handleChange(dateMenuMap[item]);
    } else {
      handleChange({
        [type]: item,
      });
    }
    setSelections({ ...selections, [type]: item });
  };

  return (
    <div className="filters-bar">
      {Object.keys(menuItems).map((type) => {
        const lowercaseType = type.toLowerCase();

        return (
          <div className="filter-dropdown-group">
            <Dropdown
              key={`dropdown-${type}`}
              style={!isSelected(lowercaseType) ? { width: '100%' } : undefined}
            >
              <Dropdown.Toggle
                key={type}
                variant="success"
                id={`dropdown-${type}-toggle`}
                className={
                  isSelected(lowercaseType) && 'dropdown-toggle-select'
                }
              >
                {isSelected(lowercaseType) ? selections[lowercaseType] : type}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {menuItems[type].map((item, i) => {
                  return (
                    <Dropdown.Item
                      active={isSelected(lowercaseType, item)}
                      eventKey={`${lowercaseType}-${i}`}
                      onClick={() => handleToggle(lowercaseType, item)}
                    >
                      {item}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            {isSelected(lowercaseType) && (
              <div
                className="dropdown-toggle-clear"
                onClick={() => handleClear(lowercaseType)}
              >
                ⊗
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
