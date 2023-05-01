import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Calendar Page 
 * 
 * retreieves and displays all of specific appointments depending on whether the user is the admin
 * displays a calendar to visualise and display the appointments for the user and the admin
 * 
 * @author Mehtab Gill
 */

function Timetable(props) {
  // Define state variables
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({title:'', start:'', patient:'', end:''});
  const [data, setData] = useState([]);
  const [eventType, setEventType] = useState('');

  // Retrieve appointments from API based on user type
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

  // Map retrieved appointments data to FullCalendar compatible event objects
  useEffect(() => {
    const appointment = data.map((value) => ({
      id: value.id,
      start: new Date(value.attributes.start),
      title: value.attributes.title,
      patient: props.user.id,
      type: value.attributes.type,
      end: new Date(value.attributes.end),
    }));    
    setEvents(appointment);
  }, [data, props.user.id]);

  // Delete appointment on event click
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
  

  // Handle date selection on FullCalendar
  const handleDateSelect = (arg) => {
    const today = new Date();
    const selected = new Date(arg.date);
    if (selected >= today) {
      setSelectedDate(selected);
      const title = prompt('Enter a title for the booking:');
      if (title) {
        const start = selected.toISOString();
        const end = new Date(selected.getTime() + 30 * 60000).toISOString();
        setEvents([
          ...events,
          {
            title: title,
            start: start,
            end: end,
            patient: props.user.id,
            type: eventType,
          },
        ]);
        setFormData({
          data: {
            title: title,
            start: start,
            end: end,
            patient: props.user.id,
          },
        });
      }
    } else {
      alert("you cannot book appointments for today or previous days")
    }
  }

  // set the type of appointment that the user is booking
  const handleEventTypeSelect = (event) => {
    setEventType(event.target.innerText);
  };


  // submit the appointment with relevant data to the database 
  const handleSubmit = async (e) => {
    setFormData({data: {type: eventType,},});
    e.preventDefault();
    if (eventType === "") {
      alert("you must select and appointment type")
    }else{
    setIsBooking(true);
    try {
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify(formData)
      const response = await axios.post('http://localhost:1337/api/appointments', body, config);
      console.log(response)
        alert('Your booking has been confirmed!');
    } catch (error) {
      console.error(error);
      alert('There was an error reserving your appointment, this time slot may already be taken, please try again or select another time');
    } finally {
      setIsBooking(false);
      window.location.reload(false);
    }
   }
  };

  // display the calendar
  return (
      <Container className='content'>
        <div>
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
            nowIndicator = {true}
            headerToolbar = {{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            businessHours={{ 
              startTime: '08:00', // a start time (10am in this example)
              endTime: '18:00', // an end time (6pm in this example)
              daysOfWeek: [ 1, 2, 3, 4, 5 ] }} // Monday - Friday
            slotMinTime={'09:00'}
            slotMaxTime={'18:00'}
          />
        </div>
        {selectedDate && (
          <div>      
            <Dropdown className='bookButton'>
              <Dropdown.Toggle variant="primary" id="dropdown-button-dark">
                Appointment type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEventTypeSelect}>clinic</Dropdown.Item>
                <Dropdown.Item onClick={handleEventTypeSelect}>phone</Dropdown.Item>
                <Dropdown.Item onClick={handleEventTypeSelect}>video</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form onSubmit={handleSubmit} className='bookButton'>
              <Button type='submit' disabled={isBooking}>
                {isBooking ? 'Booking...' : 'Book Appointment'}
              </Button>
            </Form>
          </div> 
        )}
        </Container>
  );
}

export default Timetable;
