import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import API from '../../../../api';
import { useAuth } from '../../../../auth/use-auth';
import createMapFromArray from '../../../../libs/createMapFromArray';

import { LoadingResource } from '../../../../components/LoadingResource/LoadingResource.component';
import { EventCard } from '../EventCard/EventCard.component';

import './EventList.styles.scss';

export const EventList = ({ dataFetched, events, filterOnline }) => {
  const [favoritesMap, setFavoritesMap] = useState(null);
  const history = useHistory();
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      setFavoritesMap(createMapFromArray(user.favorites));
    }
  }, [user]);

  const toggleFavorite = async (id) => {
    let updatedFavorites = [];
    if (favoritesMap[id]) {
      updatedFavorites = user.favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...user.favorites, id];
    }

    try {
      const response = await new API(token).updateUser({
        favorites: updatedFavorites,
      });
      user.favorites = response.user.favorites;
      setFavoritesMap(createMapFromArray(user.favorites));
    } catch (err) {
      console.error(err);
    }
  };

  if (!dataFetched) return <LoadingResource>Loading events...</LoadingResource>;

  return (
    <Container as="ol" className="event-list" fluid>
      {!events.length ? (
        <h2 className="event-list-not-found">No events found.</h2>
      ) : (
        events.map((el) => (
          <EventCard
            key={el.id}
            event={el}
            toggleFavorite={toggleFavorite}
            favoritesMap={favoritesMap}
          />
        ))
      )}
    </Container>
  );
};
