import React, { useCallback } from 'react';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';

import CalendarListPage from '../calendar-list-page/calendar-list-page.component';
import { MyEventsCard } from './components/MyEventsCard/MyEventsCard.component';

import './my-events-page.styles.scss';

const MyEventsPage = () => {
  const { token } = useAuth();

  const fetchEvents = useCallback(
    async (options) => {
      return await new API(token).getMyEvents(options);
    },
    [token]
  );

  return (
    <CalendarListPage
      manageResource="events"
      fetchEvents={fetchEvents}
      card={<MyEventsCard />}
    />
  );
};

export default MyEventsPage;
