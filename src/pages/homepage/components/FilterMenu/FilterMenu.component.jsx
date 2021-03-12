import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './FilterMenu.styles.scss';

export const FilterMenu = (props) => {
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
  return (
    <div className="filters-bar">
      {['Date', 'Category', 'Type', 'Language'].map((type) => (
        <DropdownButton
          as={ButtonGroup}
          key={type}
          id={`dropdown-${type}`}
          title={type}
        >
          {menuItems[type].map((item, i) => (
            //Pass active filter item as prop: active={props.active===variant ? "true" : "false"}
            <Dropdown.Item eventKey={i}>{`${item}`}</Dropdown.Item>
          ))}
        </DropdownButton>
      ))}
    </div>
  );
};
