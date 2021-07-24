import React from 'react';

import API from '../../api';
import { useAuth } from '../../auth/use-auth';

import CalendarListPage from '../calendar-list-page/calendar-list-page.component';
import { MyEventsCard } from './components/MyEventsCard/MyEventsCard.component';

import './my-events-page.styles.scss';

const MyEventsPage = () => {
  const { token } = useAuth();

  return (
    <CalendarListPage
      manageResource="events"
      fetchEvents={new API(token).getMyEvents}
      card={<MyEventsCard />}
    />
  );
};

export default MyEventsPage;
