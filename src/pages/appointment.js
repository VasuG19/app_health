import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Appointment(props) {
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({title:'', start:'', patient:''});
  const [data, setData] = useState([]);

  // retrieve appointments from API
  useEffect( () => {
    if (!props.user ||props.user.title!== 'Admin') {
      fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq]=${props.user.id}`)
      .then((response) => response.json())
      .then((json) => {setData(json.data)})
      .catch((err) => {console.log(err.message)});
     } else {
      fetch(`http://localhost:1337/api/appointments?populate=*`)
      .then((response) => response.json())
      .then((json) => {setData(json.data)})
      .catch((err) => {console.log(err.message)});
     }
  }, [props.user]);
  
  useEffect(() => {
    const appointment = data.map((value) => ({
      id: value.id,
      start: new Date(value.attributes.start),
      title: value.attributes.title,
      patient: props.user.id
    }));    
    setEvents(appointment);
  }, [data, props.user.id]);

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
      window.location.reload(false);
    }
  };

  const handleDateSelect = (arg) => {
    setSelectedDate(arg.date);
    const title = prompt('Enter a title for the booking:');
    if (title) {
      setEvents([
      ...events,
      {
        title: title,
        start: arg.date,
        patient: props.user.id
      },
      ]);
      setFormData({
        data:{
        title: title,
        start: arg.date.toISOString(),
        patient: props.user.id
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
      const response = await axios.post('http://localhost:1337/api/appointments', body, config);
      console.log(response)
        alert('Your booking has been confirmed!');
    } catch (error) {
      console.error(error);
      alert('There was an error making your booking.');
    } finally {
      setIsBooking(false);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <div className='calender'>
        <FullCalendar
          plugins ={[dayGridPlugin, interactionPlugin, bootstrap5Plugin, timeGridPlugin]}
          initialView ='timeGridWeek'
          selectable ={true}
          selectMirror ={true}
          dayMaxEvents ={true}
          weekends ={false}
          events ={events}
          dateClick ={handleDateSelect}
          eventClick ={handleEventClick}
          themeSystem ='bootstrap5'
          allDaySlot = {false}
          headerToolbar = {{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          aspectRatio={2}
          businessHours={{
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Friday
            startTime: '09:00', // a start time (9am in this example)
            endTime: '18:00', // an end time (6pm in this example)
          }}
          slotMinTime={'09:00'}
          slotMaxTime={'18:00'}

        />
      </div>
      {selectedDate && (
        <div>
          <Form onSubmit={handleSubmit} className='bookButton'>
            <Button type='submit' disabled={isBooking}>
              {isBooking ? 'Booking...' : 'Book Appointment'}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Appointment;
