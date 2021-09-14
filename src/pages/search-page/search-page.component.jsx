import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useErrorHandler } from 'react-error-boundary';

import API from '../../api';
import { usePagination } from '../../libs/usePagination';

import { EventList } from '../homepage/components/EventList/EventList.component';
import { PageControl } from '../homepage/components/PageControl/PageControl.component';

import './search-page.styles.scss';

export const SearchPage = ({ location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const handleError = useErrorHandler();
  const { totalPages, setTotalPages, currentPage, handleChangePage } =
    usePagination();

  const searchQuery = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('q');
  }, [location.search]);

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
      } catch (err) {
        handleError(err);
      }
    };
    if (searchQuery) getSearchResults();
  }, [searchQuery, currentPage, setTotalPages, handleError]);

  return (
    <Container fluid as="main" className="search-page">
      <Row as="header" className="search-page-header">
        <Col xs={12}>
          <h1>Search events</h1>
          <p>{`Showing results for: "${searchQuery}"`}</p>
        </Col>
      </Row>
      <section className="search-page-results">
        <EventList events={searchResults} />
      </section>
      <PageControl
        page={currentPage}
        totalPages={totalPages}
        handleChange={handleChangePage}
      />
    </Container>
  );
};
