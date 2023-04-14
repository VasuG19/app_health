import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';


function Appointment(props) {
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [book, setBook] = useState({title:'', start:''});
  
  useEffect(() => {
    const appointment = props.data.map((value) => ({
      id: value.id,
      start: new Date(value.attributes.start),
      title: value.attributes.context,
    }));    
    setEvents(appointment);
  }, [props.data]);

  const handleEventClick = async (arg) => {
    if (window.confirm(`Are you sure you want to delete the booking '${arg.event.title}'?`)) {
      try {
        // Delete the appointment using the API
        const response = await fetch(`http://localhost:1337/api/appointments/${arg.event.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEvents(events.filter((event) => event.id !== arg.event.id));
          alert('Booking deleted successfully!');
        } else {
          alert('There was an error deleting the booking.');
        }
      } catch (error) {
        console.error(error);
        alert('There was an error deleting the booking.');
      }
    }
  };

  const handleDateSelect = (arg) => {
    console.log("handleDateSelect called with arg: ", arg);
    setSelectedDate(arg.date);
    const title = prompt('Enter a title for the booking:');
    if (title) {
      setEvents([
        ...events,
        {
          title: title,
          start: arg.date,
        },
      ]);
      setBook([
        ...book,
        {
          title: title,
          start: arg.date,
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    try {
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify( book )
      const response = await axios.post('http://localhost:1337/api/appointments', body, config);
      console.log(response.data)
      if (response.ok) {
        const appointment = await response.json();
        setEvents([
          ...events,
          {
            id: appointment.id,
            title: 'New Booking',
            start: appointment.attributes.start,
          },
        ]);
        alert('Your booking has been confirmed!');
      } else {
        alert('There was an error making your booking.');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error making your booking.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className='calender'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        initialView='dayGridMonth'
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={handleDateSelect}
        eventClick={handleEventClick}
        themeSystem='bootstrap5'
      />
      {selectedDate && (
        <form onSubmit={handleSubmit}>
          <button type='submit' disabled={isBooking}>
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Appointment;
