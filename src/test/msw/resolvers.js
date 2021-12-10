import { mockEvents, mockUsers } from '../mocks/mockData';
import { userImage } from '../mocks/userImage';
import { eventImage } from '../mocks/eventImage';
import { jpeg } from './jpeg';

export const getEvents = (req, res, ctx) => {
  let data = {};

  const paginate = JSON.parse(req.url.searchParams.get('paginate'));
  if (paginate) {
    data = {
      data: mockEvents(paginate.limit),
      total: 10,
      page: paginate.page,
      pages: 2,
    };
  } else {
    data = {
      data: mockEvents(10),
    };
  }

  const search = req.url.searchParams.get('search');
  if (search === 'bad-query') {
    data.data = [];
  } else if (search === 'error-query') {
    return sendError(res, ctx, {
      status: 'error',
      statusCode: 500,
      message: 'Something went wrong.',
    });
  }

  return res(
    ctx.status(200),
    ctx.json({
      status: 200,
      results: data.data.length,
      data,
    })
  );
};

export const getEventById = (req, res, ctx) => {
  const { id } = req.params;

  //handle error
  if (id === 'error-id') {
    return sendError(res, ctx, {
      status: 'fail',
      statusCode: 404,
      message: 'The requested event was not found.',
    });
  }

  //handle unpublished, which wasn't working as an override
  let map = undefined;
  if (id === 'unpublished-id') {
    map = (event) => {
      event.published = false;
      return event;
    };
  }

  const overrides = {
    name: 'Test Event',
    organizer: mockUsers(1, {
      overrides: {
        _id: 'test-user-id',
        name: 'Test User',
        tagline: 'Hello World!',
      },
    }),
  };

  //handle canceled
  if (id === 'canceled-id') {
    overrides.canceled = true;
  }

  //handle past event
  if (id === 'past-id') {
    overrides.dateTimeStart = new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 2
    ).toISOString();
  }

  //handle sold out
  if (id === 'sold-out-id') {
    overrides.ticketTiers = [
      {
        tierName: 'Test ticket',
        tierDescription: 'Test ticket description',
        price: 30,
        online: false,
        limitPerCustomer: 2,
        quantity: 100,
        numBookings: 100,
        ticketSoldOut: true,
      },
    ];
  }

  const event = mockEvents(1, {
    overrides,
    map,
  });

  return res(
    ctx.status(200),
    ctx.json({
      status: 200,
      data: {
        data: event,
      },
    })
  );
};

export const getUserImage = getImage(userImage);
export const getEventImage = getImage(eventImage);

function getImage(img) {
  return function (req, res, ctx) {
    return res(jpeg(img));
  };
}

function sendError(res, ctx, error) {
  return res(
    ctx.status(error.status),
    ctx.json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    })
  );
}
