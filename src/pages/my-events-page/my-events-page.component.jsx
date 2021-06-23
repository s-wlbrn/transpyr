import React from 'react';
import { useAuth } from '../../auth/use-auth';
import { MyEventsCard } from './components/MyEventsCard/MyEventsCard.component';

import './my-events-page.styles.scss';
import CalendarListPage from '../calendar-list-page/calendar-list-page.component';

const MyEventsPage = () => {
  const { user } = useAuth();

  return (
    <CalendarListPage
      manageResource="events"
      url={`http://localhost:3000/api/events?organizer=${user._id}&`}
      card={<MyEventsCard />}
    />
  );
};

export default MyEventsPage;
