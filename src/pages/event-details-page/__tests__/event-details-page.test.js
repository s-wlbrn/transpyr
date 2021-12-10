import React from 'react';
import { createBrowserHistory } from 'history';
import { ErrorBoundary } from 'react-error-boundary';
import { render, screen } from '../../../test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import EventDetailsPage from '../event-details-page.component';
import ErrorPage from '../../error-page/error-page.component';

//test renders loading page, calls api and renders event details
test('calls API with event ID, renders loading message, renders published event details, renders booking modal on book button click', async () => {
  render(
    <EventDetailsPage
      match={{ params: { id: 'test-id' }, path: '/events/id/test-id' }}
    />,
    { route: '/events/id/test-id' }
  );
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/loading event/i)).toBeInTheDocument();
  await screen.findByText(/test event/i);
  //no own event controls
  expect(screen.queryByText(/this is your event/i)).not.toBeInTheDocument();
  //assert event organizer details
  expect(screen.queryAllByText(/test user/i)).toHaveLength(2);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  //click book button
  const bookButton = screen.getByRole('button', { name: /book/i });
  userEvent.click(bookButton);
  expect(window.location.pathname).toBe('/events/id/test-id/tickets');
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // it seems like testing that the app is forming the query string right is important  .
});

test('throws error when API call returns with error', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <EventDetailsPage match={{ params: { id: 'error-id' } }} />
    </ErrorBoundary>
  );
  const error = await screen.findByText(/error/i);
  expect(error).toBeInTheDocument();
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('displays own event control when user is the organizer', async () => {
  const testUser = {
    _id: 'test-user-id',
    name: 'authorized user',
    email: 'the@organizer.com',
  };

  render(<EventDetailsPage match={{ params: { id: 'test-id' } }} />, {
    auth: { user: testUser, token: 'test-token' },
  });
  await screen.findByText(/test event/i);
  expect(screen.getByText(/this is your event/i)).toBeInTheDocument();
});

test('do not show ticket modal on book button click for unpublished event', async () => {
  const history = createBrowserHistory();
  const route = '/events/id/unpublished-id';
  render(
    <EventDetailsPage
      match={{
        params: { id: 'unpublished-id' },
        path: route,
      }}
    />,
    { history, route }
  );
  await screen.findByText(/test event/i);
  const bookEventButton = screen.getByRole('button', { name: /unpublished/i });
  expect(bookEventButton).toBeDisabled();
  userEvent.click(bookEventButton);
  expect(window.location.pathname).toBe(route);
  history.push(`${route}/tickets`);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('do not show ticket modal on book button click for sold out event', async () => {
  const history = createBrowserHistory();
  const route = '/events/id/sold-out-id';
  render(
    <EventDetailsPage
      match={{
        params: { id: 'sold-out-id' },
        path: route,
      }}
    />,
    { history, route }
  );
  await screen.findByText(/test event/i);
  const bookEventButton = screen.getByRole('button', { name: /sold out/i });
  expect(bookEventButton).toBeDisabled();
  userEvent.click(bookEventButton);
  expect(window.location.pathname).toBe(route);
  history.push(`${route}/tickets`);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('do not show ticket modal on book button click for canceled event', async () => {
  const history = createBrowserHistory();
  const route = '/events/id/canceled-id';
  render(
    <EventDetailsPage
      match={{
        params: { id: 'canceled-id' },
        path: route,
      }}
    />,
    { history, route }
  );
  await screen.findByText(/test event/i);
  const bookEventButton = screen.getByRole('button', { name: /canceled/i });
  expect(bookEventButton).toBeDisabled();
  userEvent.click(bookEventButton);
  expect(window.location.pathname).toBe(route);
  history.push(`${route}/tickets`);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('do not show ticket modal on book button click for past event', async () => {
  //date-fns is complaining about having to parse a string, but it's not a problem
  console.warn = jest.fn();
  const history = createBrowserHistory();
  const route = '/events/id/past-id';
  render(
    <EventDetailsPage
      match={{
        params: { id: 'past-id' },
        path: route,
      }}
    />,
    { history, route }
  );
  await screen.findByText(/test event/i);
  const bookEventButton = screen.getByRole('button', { name: /past event/i });
  expect(bookEventButton).toBeDisabled();
  userEvent.click(bookEventButton);
  expect(window.location.pathname).toBe(route);
  history.push(`${route}/tickets`);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
