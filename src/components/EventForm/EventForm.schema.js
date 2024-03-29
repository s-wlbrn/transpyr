import * as yup from 'yup';
import { format, formatISO, startOfDay, isToday, isSameDay } from 'date-fns';

import { eventTypes } from '../../libs/eventTypes';
import { eventCategories } from '../../libs/eventCategories';
import {
  noSpareTickets,
  ticketCapacitiesWithinTotal,
  uniqueTicketNames,
} from './EventForm.validators';

export const validationSchemaArray = [
  yup.object().shape({
    name: yup
      .string()
      .required('An event name is required.')
      .min(8, 'Event name should be at least 8 characters.')
      .max(75, 'Event name should be at most 75 characters.'),
    type: yup
      .string()
      .required('An event type is required.')
      .oneOf(eventTypes, 'Invalid event type.'),
    category: yup
      .string()
      .required('An event category is required.')
      .oneOf(eventCategories, 'Invalid event category.'),
    //total capacity should be moved to the ticketTiers form...
    totalCapacity: yup.number().required('A total capacity is required.'),
  }),
  yup.object().shape({
    description: yup.string().required('An event description is required.'),
  }),
  yup.object().shape({
    dateStart: yup
      .date()
      .typeError('Invalid start date.')
      .required('An start date is required.')
      .min(
        formatISO(startOfDay(Date.now())),
        'The event start date must be in the future.'
      ),
    timeStart: yup
      .string()
      .required('A start time is required.')
      .when('dateStart', {
        is: (val) => isToday(val),
        then: yup
          .string()
          .test(
            'startTime-after-now',
            'Start time must be in the future.',
            function (value) {
              return (
                new Date(
                  `${format(this.parent.dateStart, 'yyyy-MM-dd')}T${value}`
                ) >= Date.now()
              );
            }
          ),
      }),
    dateEnd: yup
      .date()
      .typeError('Invalid end date.')
      .required('An end date is required.')
      .test(
        'dateEnd-after-start',
        'The end date cannot be before the start date.',
        function (value) {
          return value ? new Date(value) >= this.parent.dateStart : true;
        }
      ),
    timeEnd: yup
      .string()
      .required('An end time is required.')
      .when(['dateStart', 'dateEnd'], {
        is: (dateStart, dateEnd) => isSameDay(dateStart, dateEnd),
        then: yup
          .string()
          .test(
            'timeEnd-after-start',
            'End time must be after the start time.',
            function (value) {
              return (
                new Date(
                  `${format(this.parent.dateStart, 'yyyy-MM-dd')}T${
                    this.parent.timeStart
                  }`
                ) <
                new Date(
                  `${format(this.parent.dateEnd, 'yyyy-MM-dd')}T${value}`
                )
              );
            }
          ),
      }),
  }),
  yup.object().shape({
    ticketTiers: yup
      .array()
      .of(yup.object())
      .min(1, 'At least one ticket type is required.')
      .test(
        'unique-ticket-names',
        'Tickets names must be unique.',
        uniqueTicketNames
      )
      .test(
        'capacities-not-over-max',
        "The sum of the individual ticket capacities cannot exceed the event's total.",
        ticketCapacitiesWithinTotal
      )
      .test(
        'no-spare-tickets',
        "All tickets currently have limited capacities, but they total fewer than the event's maximum. This will make some tickets unavailable. You can set one or more tickets to unlimited by leaving the capacity at 0.",
        noSpareTickets
      ),
  }),
  yup.object().shape({
    locationValid: yup
      .boolean()
      .required('Location must be valid.')
      .oneOf([true], 'Invalid location.'),
  }),
];
