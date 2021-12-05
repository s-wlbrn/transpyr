import { build, perBuild, oneOf, fake } from '@jackfranklin/test-data-bot';
import { addHours } from 'date-fns';
import { isOnlineOnly } from '../../libs/isOnlineOnly';
import {
  calculateTotalBookings,
  calculateTotalCapacity,
  calculateSoldOut,
} from '../utils/testDataUtils';
import { randomInteger } from '../utils/randomInteger';

const ticketBuilder = build('Ticket', {
  fields: {
    id: fake((f) => f.random.uuid()),
    tierName: fake((f) => f.lorem.words()),
    tierDescription: fake((f) => f.lorem.paragraph(2)),
    price: fake((f) => f.random.number({ min: 0 })),
    online: fake((f) => f.random.boolean()),
    capacity: fake((f) => f.random.number({ min: 0, max: 5000 })),
  },
  postBuild: (ticket) => {
    //generate limitPerCustomer based on capacity
    ticket.limitPerCustomer = randomInteger(0, ticket.capacity);
    //generate numBookings based on capacity
    ticket.numBookings = randomInteger(0, ticket.capacity);
    //generate ticketSoldOut
    ticket.ticketSoldOut = ticket.numBookings >= ticket.capacity;
    return ticket;
  },
});

const locationBuilder = build('Location', {
  fields: {
    type: 'Point',
    coordinates: [
      fake((f) => f.address.longitude()),
      fake((f) => f.address.latitude()),
    ],
  },
});

export const eventBuilder = build('Event', {
  fields: {
    id: fake((f) => f.random.uuid()),
    name: fake((f) => f.lorem.words()),
    type: oneOf(
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
      'Tour'
    ),
    category: oneOf(
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
      'Other'
    ),
    description: fake((f) => f.lorem.paragraph(2)),
    ticketTiers: perBuild(() => {
      return new Array(randomInteger(1, 10)).fill(null).map(() => {
        return ticketBuilder();
      });
    }),
    photo: 'default.jpeg',
    dateTimeStart: fake((f) => f.date.future()),
    createdAt: fake((f) => f.date.past()),
    organizer: fake((f) => f.random.uuid()),
    address: fake((f) =>
      f.fake(
        '{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}'
      )
    ),
    location: locationBuilder(),
  },
  postBuild: (event) => {
    //calculate dateTimeEnd based on random number of hours from start
    event.dateTimeEnd = addHours(event.dateTimeStart, randomInteger(1, 48));
    //generate convertedDescription
    event.convertedDescription = `<p>${event.description}</p>`;
    //determine if event is online only based on created tickets
    event.onlineOnly = isOnlineOnly(event.ticketTiers);
    //remove address and location if onlineOnly
    if (event.onlineOnly) {
      delete event.address;
      delete event.location;
    }
    //calculate totalBookings from ticketTiers
    event.totalBookings = calculateTotalBookings(event.ticketTiers);
    //calculate totalCapacity from ticketTiers, return zero if any ticketTiers have capacity of 0
    event.totalCapacity = calculateTotalCapacity(event.ticketTiers);
    //soldOut
    event.soldOut = calculateSoldOut(event.ticketTiers);

    return event;
  },
});
