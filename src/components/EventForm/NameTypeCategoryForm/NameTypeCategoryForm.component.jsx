import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import { FormInput } from '../../FormInput/FormInput.component';
import { FormDropdown } from '../../FormDropdown/FormDropdown.component';

import './NameTypeCategoryForm.styles.scss';

const eventTypes = [
  '',
  'Lecture',
  'Class',
  'Performance',
  'Social',
  'Workshop',
  'Conference',
  'Convention',
  'Expo',
  'Game',
  'Rally',
  'Screening',
  'Tour',
];
const eventCategories = [
  '',
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
  'Science & Technology',
  'Holiday',
  'Sports & Fitness',
  'Travel',
  'Outdoor & Recreation',
  'Other',
];

export const NameTypeCategoryForm = ({
  name,
  type,
  category,
  handleChange,
  totalCapacity,
}) => {
  console.log(category);
  return (
    <Container fluid className="name-type-category-form">
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
            value={type}
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
            value={category}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>What is the event capacity?</h2>
        </Col>
        <Col xs={6} className="create-event-total-capacity">
          <FormInput
            name="totalCapacity"
            type="number"
            id="totalCapacity"
            value={totalCapacity}
            handleChange={handleChange}
            label="Capacity"
            required
          />
        </Col>
        <Col xs={12}>
          <p className="create-event-capacity-description">
            This is the total capacity for your event. Specific ticket
            capacities can be set later. A value of zero indicates there is no
            maximum.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
