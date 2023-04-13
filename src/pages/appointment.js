import { React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

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

  useEffect(() => {
  const appointment = props.data.map((value) => ({
                start: '{value.attributes.date}',
                Title: '{value.attributes.patients.data.attributes.first_name}',
  }))
  const dummyEvents = [
    {
      title: 'Event 1',
      start: '2023-04-23T10:00:00.00Z',
      end: '2023-04-23T12:00:00'
    },
    {
      title: 'Event 2',
      start: '2023-04-13T13:00:00Z',
      end: '2023-04-13T15:00:00'
    },
  ];
  setEvents(appointment);
  },[props.data]);


  const handleEventClick = (arg) => {
    if (window.confirm(`Are you sure you want to delete the booking '${arg.event.title}'?`)) {
      setEvents(events.filter((event) => event !== arg.event));
    }
  };

  return (
    <div className='calender'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={handleDateSelect}
        eventClick={handleEventClick}
        themeSystem= "bootstrap5"
      />
    </div>
  );
}


export default Appointment