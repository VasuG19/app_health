import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Appointment(props) {
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({title:'', start:''});
  
  useEffect(() => {
    const appointment = props.data.map((value) => ({
      id: value.id,
      start: new Date(value.attributes.start),
      title: value.attributes.title,
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
      setFormData({
        data:{
        title: title,
        start: arg.date.toISOString(),
      }
      });
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    try {
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify(formData)
      console.log("body",body)
      const response = await axios.post('http://localhost:1337/api/appointments', body, config);
      console.log(response)
        alert('Your booking has been confirmed!');
    } catch (error) {
      console.error(error);
      alert('There was an error making your booking.');
    } finally {
      setIsBooking(false);
    }
    console.log("formdata",formData)
  };

  return (
    <div>
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
      </div>
      {selectedDate && (
        <div>
          <form onSubmit={handleSubmit} className='bookButton'>
            <Button type='submit' disabled={isBooking}>
              {isBooking ? 'Booking...' : 'Book Appointment'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Appointment;
