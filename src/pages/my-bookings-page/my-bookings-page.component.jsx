import React from 'react';
import CalendarListPage from '../calendar-list-page/calendar-list-page.component';
import { MyBookingsCard } from './components/MyBookingsCard/MyBookingsCard.component';
import './my-bookings-page.styles.scss';

const MyBookingsPage = () => {
  return (
    <CalendarListPage
      manageResource="bookings"
      url={`http://localhost:3000/api/events/me/booked-events?`}
      card={<MyBookingsCard />}
    />
  );
};

export default MyBookingsPage;
