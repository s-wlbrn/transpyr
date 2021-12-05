import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';

import API from '../../api';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { usePagination } from '../../libs/usePagination';

import { EventList } from '../homepage/components/EventList/EventList.component';
import { PageControl } from '../homepage/components/PageControl/PageControl.component';

import './search-page.styles.scss';

const SearchPage = ({ location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const history = useHistory();
  const handleError = useErrorHandler();
  const { totalPages, setTotalPages, currentPage, handleChangePage } =
    usePagination();

  //extract search query and redirect if not present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');
    if (!searchQuery) {
      return history.push('/');
    }
    setSearchQuery(searchQuery);
  }, [location.search, history]);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await new API().getEvents({
          query: {
            search: searchQuery,
            paginate: { page: currentPage, limit: 8 },
          },
          calculateEventInfo: true,
        });
        setTotalPages(response.pages);
        setSearchResults(response.data);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };
    if (searchQuery) getSearchResults();
  }, [searchQuery, currentPage, setTotalPages, handleError]);

  if (!dataFetched)
    return (
      <LoadingResource page={true}>Loading search results...</LoadingResource>
    );

  return (
    <Container fluid as="main" className="search-page">
      <Row as="header" className="search-page-header">
        <Col xs={12}>
          <h1>Search events</h1>
          <p>{`Showing results for: "${searchQuery}"`}</p>
        </Col>
      </Row>
      <section className="search-page-results">
        <EventList events={searchResults} dataFetched={dataFetched} />
      </section>
      <PageControl
        page={currentPage}
        totalPages={totalPages}
        handleChange={handleChangePage}
      />
    </Container>
  );
};

export default SearchPage;
