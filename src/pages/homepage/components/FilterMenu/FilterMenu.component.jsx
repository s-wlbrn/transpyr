import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import './FilterMenu.styles.scss';

const menuItems = {
  Date: ['Today', 'Tomorrow', 'Select date'],
  Category: [
    'Business',
    'Food',
    'Health and Lifestyle',
    'Music',
    'Vehicle',
    'Charity',
    'Community',
    'Fashion',
    'Film',
    'Home',
    'Hobbies',
    'Performing & Visual Arts',
    'Politics',
    'Spirituality',
    'School',
    'Science and Technology',
    'Holiday',
    'Sports and Fitness',
    'Travel',
    'Outdoor & Recreation',
    'Other',
  ],
  Type: ['Lecture', 'Performance', 'Social', 'Workshop'],
  Language: ['English'],
};

export const FilterMenu = ({ query, handleChange }) => {
  const isSelected = (type, item) => {
    return query[type] === item;
  };

  const handleToggle = (type, item) => {
    const changeValue = isSelected(type, item) ? undefined : item;
    handleChange({
      [type]: changeValue,
    });
  };

  return (
    <div className="filters-bar">
      {['Date', 'Category', 'Type', 'Language'].map((type) => {
        const lowercaseType = type.toLowerCase();

        return (
          <div className="filter-dropdown-group">
            <Dropdown
              key={`dropdown-${type}`}
              style={!query[lowercaseType] ? { width: '100%' } : undefined}
            >
              <Dropdown.Toggle
                key={type}
                variant="success"
                id={`dropdown-${type}-toggle`}
                className={query[lowercaseType] && 'dropdown-toggle-select'}
              >
                {query[lowercaseType] ? query[lowercaseType] : type}
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
            {query[lowercaseType] && (
              <div
                className="dropdown-toggle-clear"
                onClick={() => handleChange({ [lowercaseType]: undefined })}
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
