import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { FormDropdown } from '../../../../components/FormDropdown/FormDropdown.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';

import './NameTypeCategoryForm.styles.scss';

const eventTypes = ['Lecture', 'Performance', 'Social', 'Workshop'];
const eventCategories = [
  'Business',
  'Food',
  'Health & Lifestyle',
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
];

export const NameTypeCategoryForm = ({ name, type, handleChange }) => {
  return (
    <React.Fragment>
      <Row className="create-event-name-input">
        <Col xs={12}>
          <h2 className="create-event-name-title">
            Enter a name for your event.
          </h2>
          <FormInput
            name="name"
            type="name"
            id="name"
            value={name}
            handleChange={handleChange}
            label="Name"
            required
          />
        </Col>
      </Row>
      <Row className="create-event-category-format">
        <Col xs={12}>
          <h2>What format is your event?</h2>
          <FormDropdown
            name="type"
            id="type"
            formId="create-event-form"
            options={eventTypes}
            handleChange={handleChange}
            label="Format"
            required
          />
        </Col>
        <Col xs={12}>
          <h2>What category is your event?</h2>
          <FormDropdown
            name="category"
            id="category"
            formId="create-event-form"
            options={eventCategories}
            handleChange={handleChange}
            label="Category"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 6, offset: 6 }}>
          <CustomButton type="button">Next</CustomButton>
        </Col>
      </Row>
    </React.Fragment>
    //make a dropdown component? or use bootstrap?
    //event type
    //category
  );
};
