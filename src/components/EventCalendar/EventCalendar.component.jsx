import { forwardRef, useState } from 'react';
import { format, startOfMonth } from 'date-fns';
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
} from '@zach.codes/react-calendar';

import '@zach.codes/react-calendar/dist/calendar-tailwind-no-reset.css';
import './EventCalendar.styles.scss';

export const EventCalendar = forwardRef(
  ({ getMonthlyEvents, events, handleHover }, ref) => {
    let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

    return (
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => {
          getMonthlyEvents(date);
          setCurrentMonth(date);
        }}
      >
        <div className="calendar-nav">
          <MonthlyNav />
        </div>
        <div className="calendar-body">
          <MonthlyBody events={events}>
            <div className="calendar-day">
              <MonthlyDay
                renderDay={(data) =>
                  data.map((item, index) => (
                    <li
                      key={index}
                      className="calendar-event"
                      onMouseOver={() => handleHover(item._id)}
                      onMouseOut={() => handleHover(item._id)}
                      ref={(r) => (ref.current[item._id] = r)}
                    >
                      <date className="calendar-event-time">
                        {format(item.date, 'k:mm')}
                      </date>
                      <h3 className="calendar-event-title">{item.title}</h3>
                    </li>
                  ))
                }
              />
            </div>
          </MonthlyBody>
        </div>
      </MonthlyCalendar>
    );
  }
);
