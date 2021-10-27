import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { LoadingResource } from '../../../components/LoadingResource/LoadingResource.component';

import './ManageEventList.styles.scss';

export const ManageEventList = React.forwardRef(
  ({ dataFetched, events, card, handleHover }, ref) => {
    const history = useHistory();

    const handleClick = (route) => {
      history.push(route);
    };

    return (
      <Container as="ol" className="manage-event-list">
        {!dataFetched ? (
          <LoadingResource>Loading events...</LoadingResource>
        ) : events.length ? (
          events.map((item, i) => {
            const Card = card;
            return React.cloneElement(Card, {
              key: item._id,
              ref: (r) => (ref.current[item._id] = r),
              event: item,
              handleClick,
              handleHover,
            });
          })
        ) : (
          <div className="manage-event-list-none">No events.</div>
        )}
      </Container>
    );
  }
);
