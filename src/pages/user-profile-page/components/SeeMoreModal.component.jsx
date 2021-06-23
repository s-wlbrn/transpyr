import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory, useRouteMatch } from 'react-router';
import myAxios from '../../../auth/axios.config';
import { CustomButton } from '../../../components/CustomButton/CustomButton.component';
import { LoadingResource } from '../../../components/LoadingResource/LoadingResource.component';
import { calculateEventInfo } from '../../../libs/calculateEventInfo';
import ErrorPage from '../../error-page/error-page.component';
import { EventList } from '../../homepage/components/EventList/EventList.component';

import './SeeMoreModal.styles.scss';

export const SeeMoreModal = ({ resource }) => {
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const match = useRouteMatch();
  const handleClose = () => {
    history.push(`/users/id/${match.params.id}`);
  };

  const getEvents = async (page = 1) => {
    try {
      const response = await myAxios().get(
        `http://localhost:3000/api/users/profile/${match.params.id}?fields=${resource}&paginate[page]=${page}&paginate[limit]=10`
      );
      console.log(response.data);
      const { user } = response.data;
      if (user[resource].length) {
        const formattedEvents = user[resource].map((event) =>
          calculateEventInfo(event)
        );
        setEvents((prevEvents) => [...prevEvents, ...formattedEvents]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(error);
    }
  };

  return (
    <Modal
      show={true}
      onShow={getEvents}
      onHide={handleClose}
      className="see-more-modal"
      scrollable={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {resource.charAt(0).toUpperCase() + resource.slice(1)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? (
          <ErrorPage {...error} />
        ) : (
          <InfiniteScroll
            pageStart={1}
            hasMore={hasMore}
            loadMore={getEvents}
            loader={
              <LoadingResource key="loader0">Loading events...</LoadingResource>
            }
          >
            {events.length ? <EventList events={events} /> : <React.Fragment />}
          </InfiniteScroll>
        )}
      </Modal.Body>
      <Modal.Footer>
        <CustomButton type="button" onClick={handleClose}>
          Close
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};
