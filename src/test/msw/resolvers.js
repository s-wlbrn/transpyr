import { mockEvents } from '../mocks/mockData';

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
