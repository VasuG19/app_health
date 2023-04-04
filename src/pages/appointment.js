import { React, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Appointment(props) {
  const [events, setEvents] = useState([]);


  const handleDateSelect = (arg) => {
    const title = prompt('Enter a title for the booking:');
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: arg.start,
          end: arg.end,
        },
      ]);
    }
  };

  const handleEventClick = (arg) => {
    if (window.confirm(`Are you sure you want to delete the booking '${arg.event.title}'?`)) {
      setEvents(events.filter((event) => event !== arg.event));
    }
  };

  return (
    <div className='calender'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={handleDateSelect}
        eventClick={handleEventClick}
      />
    </div>
  );
}


export default Appointment