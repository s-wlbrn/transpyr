import React from 'react';

import { NameTypeCategoryForm } from './NameTypeCategoryForm/NameTypeCategoryForm.component';
import { DateTimeForm } from './DateTimeForm/DateTimeForm.component';
import { DescriptionForm } from './DescriptionForm/DescriptionForm.component';
import TicketTiersForm from './TicketTiersForm/TicketTiersForm.component';
import { LocationForm } from './LocationForm/LocationForm.component';

import './EventForm.styles.scss';

export const EventForm = ({ event, step, handleChange }) => {
  const {
    name,
    type,
    category,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    description,
    ticketTiers,
    address,
    location,
    totalCapacity,
    locationValid,
    onlineOnly,
  } = event;
  switch (step) {
    case 1:
      return (
        <NameTypeCategoryForm
          handleChange={handleChange}
          name={name}
          type={type}
          category={category}
          totalCapacity={totalCapacity}
        />
      );
    case 2:
      return (
        <DescriptionForm
          description={description}
          handleChange={handleChange}
        />
      );
    case 3:
      return (
        <DateTimeForm
          handleChange={handleChange}
          dateStart={dateStart}
          dateEnd={dateEnd}
          timeStart={timeStart}
          timeEnd={timeEnd}
        />
      );
    case 4:
      return (
        <TicketTiersForm
          ticketTiers={ticketTiers}
          handleEventChange={handleChange}
          totalCapacity={totalCapacity}
        />
      );
    case 5:
      return (
        <LocationForm
          onlineOnly={onlineOnly}
          address={address}
          handleChange={handleChange}
          location={location}
          locationValid={locationValid}
        />
      );

    default:
      return null;
  }
};
