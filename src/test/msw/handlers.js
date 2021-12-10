import { rest } from 'msw';
import * as resolvers from './resolvers';

export const handlers = [
  rest.get('/api/events/:id', resolvers.getEventById),
  rest.get('/api/events', resolvers.getEvents),
  rest.get('/image/users/*', resolvers.getUserImage),
  rest.get('/image/events/*', resolvers.getEventImage),
  rest.get('*', (req, res, ctx) => {
    console.log(`Not found: ${req.url}`);
    return res(ctx.status(404), ctx.json({ message: `Not found: ${req.url}` }));
  }),
];
