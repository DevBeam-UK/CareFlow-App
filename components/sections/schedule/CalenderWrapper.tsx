import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs'
import {dayStyleGetter, eventStyleGetter} from '@/utils/style-getters'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

interface CalendarWrapperProps {
  events: any[];
  view: string;
  onViewChange: (view: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  onSelectEvent: (event: any) => void;
  onSelectSlot: (slotInfo: any) => void;
}

function CalendarWrapper({
  events,
  view,
  onViewChange,
  date,
  onDateChange,
  onSelectEvent,
  onSelectSlot,
}: CalendarWrapperProps) {
  return (
    <div className="w-full max-w-7xl rounded-xl border border-cf-border overflow-hidden" style={{ height: '600px' }}>
      <Calendar 
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view as any}
        onView={(newView) => onViewChange(newView)}
        date={date}
        onNavigate={onDateChange}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        popup
        step={30} 
        showMultiDayTimes
        defaultView="week"
        views={['day', 'week', 'month']}
        eventPropGetter={(event) => eventStyleGetter(event)}
        dayPropGetter={(date) => dayStyleGetter(date)}
        className="rbc-calendar-custom"
      />
    </div>
  );
}

export default CalendarWrapper