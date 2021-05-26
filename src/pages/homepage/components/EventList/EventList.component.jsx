import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import myAxios from '../../../../auth/axios.config';
import { useAuth } from '../../../../auth/use-auth';
import createMapFromArray from '../../../../libs/createMapFromArray';

import { LoadingResource } from '../../../../components/LoadingResource/LoadingResource.component';

import { EventCard } from '../EventCard/EventCard.component';

import './EventList.styles.scss';

export const EventList = ({ isFetching, events, filterOnline }) => {
  const [favoritesMap, setFavoritesMap] = useState(null);
  const history = useHistory();
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      setFavoritesMap(createMapFromArray(user.favorites));
    }
  }, [user]);

  const handleClick = (id) => {
    history.push(`/events/id/${id}`);
  };

  const toggleFavorite = async (id) => {
    console.log(user.favorites);
    let updatedFavorites = [];
    if (favoritesMap[id]) {
      updatedFavorites = user.favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...user.favorites, id];
    }

    try {
      console.log(updatedFavorites);
      const response = await myAxios(token).patch(
        'http://localhost:3000/api/users/me',
        { favorites: updatedFavorites }
      );
      user.favorites = response.data.user.favorites;
      setFavoritesMap(createMapFromArray(user.favorites));
    } catch (err) {
      console.log(err);
    }
  };

  if (isFetching) return <LoadingResource>Loading events...</LoadingResource>;

  return (
    <Container as="ol" className="event-listing" fluid>
      {!events.length ? (
        <h2 className="event-listing-not-found">No events found.</h2>
      ) : (
        events.map((el) => (
          <EventCard
            key={el.id}
            event={el}
            handleClick={handleClick}
            toggleFavorite={toggleFavorite}
            favoritesMap={favoritesMap}
          />
        ))
      )}
    </Container>
  );
};
