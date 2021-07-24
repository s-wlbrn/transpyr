import React from 'react';
import API from '../../api';
import { useAuth } from '../../auth/use-auth';
import CalendarListPage from '../calendar-list-page/calendar-list-page.component';
import { MyBookingsCard } from './components/MyBookingsCard/MyBookingsCard.component';
import './my-bookings-page.styles.scss';

const MyBookingsPage = () => {
  const { token } = useAuth();

  return (
    <CalendarListPage
      manageResource="bookings"
      fetchEvents={new API(token).getBookedEvents}
      card={<MyBookingsCard />}
    />
  );
};

export default MyBookingsPage;
