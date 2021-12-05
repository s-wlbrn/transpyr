import { rest } from 'msw';
import * as resolvers from './resolvers';

export const handlers = [
  rest.get('/api/events', resolvers.getEvents),
  rest.get('*', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ message: `Not found: ${req.url}` }));
  }),
];
