import { render, screen, waitFor } from '../../../test/utils/test-utils';
import SearchPage from '../search-page.component';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../error-page/error-page.component';

test('calls API with search term, renders loading message, renders fetched search results', async () => {
  render(<SearchPage location={{ search: '?q=test-query' }} />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  );
  expect(screen.getByText(/test-query/i)).toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(8);
});

test('displays no events found message when no results', async () => {
  render(<SearchPage location={{ search: '?q=bad-query' }} />);
  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  );
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  expect(screen.getByText(/no events found/i)).toBeInTheDocument();
});

test('redirects when no search term is provided', () => {
  render(<SearchPage location={{}} />);
  expect(window.history.length).toBe(2);
  expect(window.location.pathname).toBe('/');
});

test('throws error when API call fails', async () => {
  const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <SearchPage location={{ search: '?q=error-query' }} />
    </ErrorBoundary>
  );
  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  );
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});
