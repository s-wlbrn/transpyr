import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { Route } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import myAxios from '../../auth/axios.config';

import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';
import { UserProfileImage } from '../../components/UserProfileImage/UserProfileImage.component';
import { calculateEventInfo } from '../../libs/calculateEventInfo';
import { EventList } from '../homepage/components/EventList/EventList.component';
import { SeeMoreModal } from './components/SeeMoreModal.component';
import { ErrorModal } from '../../components/ErrorModal/ErrorModal.component';

import './user-profile-page.styles.scss';
import API from '../../api';

const UserProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const history = useHistory();
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await new API().getUserProfile(match.params.id);

        if (user.events) {
          const formattedEvents = user.events.map((event) =>
            calculateEventInfo(event)
          );
          setUserEvents(formattedEvents);
        }
        if (user.favorites) {
          const formattedFavorites = user.favorites.map((event) =>
            calculateEventInfo(event)
          );
          setUserFavorites(formattedFavorites);
        }

        setUser(user);
        setDataFetched(true);
      } catch (err) {
        handleError(err);
      }
    };
    fetchUser();
  }, [match.params.id, handleError]);

  if (!dataFetched) return <LoadingResource>Loading user...</LoadingResource>;

  return (
    <Container fluid as="main" className="user-profile-page">
      <ErrorBoundary
        onReset={() => history.push(`/users/id/${match.params.id}`)}
        FallbackComponent={ErrorModal}
      >
        <Route path={`${match.path}/events`}>
          <SeeMoreModal resource="events" />
        </Route>
        <Route path={`${match.path}/favorites`}>
          <SeeMoreModal resource="favorites" />
        </Route>
      </ErrorBoundary>
      <Row as="section" className="user-profile-intro">
        <Col xs={12} md={6}>
          <UserProfileImage id={user.photo} />
        </Col>
        <Col xs={12} md={6}>
          <h1 className="user-profile-name">{user.name}</h1>
          <p className="user-profile-tagline">{user.tagline}</p>
        </Col>
        <hr />
      </Row>

      <section className="user-profile-content">
        <Row>
          <Col xs={12}>
            <h2>Bio</h2>
            <p>
              {user.bio ? user.bio : 'This user has not provided a bio yet.'}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h2>Interests</h2>
            <p>
              {user.interests
                ? user.interests
                : 'This user has not provided their interests yet.'}
            </p>
          </Col>
        </Row>
        {userEvents.length ? (
          <Row className="user-profile-events">
            <Col xs={12}>
              <h2>Events</h2>
              <Link to={`${match.url}/events`} className="user-profile-see-all">
                (See All)
              </Link>
              <EventList events={userEvents} />
            </Col>
          </Row>
        ) : (
          <React.Fragment />
        )}
        <Row className="user-profile-favorites">
          <Col xs={12}>
            <h2>Favorites</h2>
            <Link
              to={`${match.url}/favorites`}
              className="user-profile-see-all"
            >
              (See All)
            </Link>
            {user.favorites ? (
              user.favorites.length > 0 ? (
                <EventList events={userFavorites} />
              ) : (
                <p>This user has no favorite events.</p>
              )
            ) : (
              <p>This user's favorite events are private.</p>
            )}
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default UserProfilePage;
