import { forwardRef, useState } from 'react';
import { format, startOfMonth } from 'date-fns';
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

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
            <MonthlyDay
              renderDay={(data) =>
                data.map((item, index) => (
                  <div
                    onMouseOver={() => handleHover(item._id)}
                    onMouseOut={() => handleHover(item._id)}
                    ref={(r) => (ref.current[item._id] = r)}
                  >
                    <DefaultMonthlyEventItem
                      key={index}
                      title={item.title}
                      // Format the date here to be in the format you prefer
                      date={format(item.date, 'k:mm')}
                    />
                  </div>
                ))
              }
            />
          </MonthlyBody>
        </div>
      </MonthlyCalendar>
    );
  }
);
