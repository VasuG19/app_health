import { React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from 'react-bootstrap';

function Appointment() {
  const [events, setEvents] = useState([]);

  // declare variables
  const [booking, setBooking] = useState([]);
    
  // retrieve appointments from API
    const database = "http://localhost:1337/api/appointments";
    useEffect( () => {
      fetch(database)
      .then((response) => response.json())
      .then((json) => {
              setBooking(json.data);
              console.log(json.data)
          }
      )
      .catch((err) => {console.log(err.message);});
  }, []);

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

  const bookings = booking.map((value) =>
        <div key={value.id}>
            <Card className='card'>
                <Card.Body className='appointmentCard'>
                    <Card.Title>{value.attributes.Date}</Card.Title>
                    <Card.Title>{value.attributes.patient.data.attributes.first_name}</Card.Title>
                    <Card.Text>{value.attributes.Context}</Card.Text>
                </Card.Body>
            </Card> 
        </div>
    )

  return (
    <div className='calender'>
        {bookings}
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