import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
  const [data, setData] = useState([]);

  // Retrieve appointments from API based on user type
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = '';
        if (!props.user || props.user.title !== 'client') {
          url = `http://localhost:1337/api/appointments?populate=*&filters[patient][id][$eq]=${props.patient.id}`;
        } else {
          url = `http://localhost:1337/api/appointments?populate=*&filters[client][id][$eq]=${props.client.id}`;
        }
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAppointments();
  }, [props.patient.id, props.user, props.client.id]);

  // Map retrieved appointments data to FullCalendar compatible event objects
  useEffect(() => {
    const appointment = data.map((value) => ({
      id: value.id,
      start: new Date(value.attributes.start),
      title: value.attributes.title,
      type: value.attributes.type,
      end: new Date(value.attributes.end),
    }));    
    setEvents(appointment);
  }, [data,]);

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

  // display the calendar
  return (
          <FullCalendar
            plugins ={[dayGridPlugin, interactionPlugin, bootstrap5Plugin, timeGridPlugin]}
            initialView ='timeGridWeek'
            selectable ={true}
            selectMirror ={true}
            dayMaxEvents ={true}
            weekends ={false}
            events ={events}
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
  );
}

export default Timetable;
