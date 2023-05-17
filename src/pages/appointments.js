import { React, useState, useEffect } from 'react';
import { Button, Card, Carousel, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Timetable from '../componants/calendar';

/**
 * Appointment Page 
 * 
 * retreives all appointments relevant to the current user
 * and displays them in an upcoming and previous carousel
 * 
 * @author Mehtab Gill
 */

// Component to show upcoming and previous appointments
function Appointments(props) {

// States to hold the data for previous and upcoming appointments, selected appointment and whether to show modal or not.
const [previous, setPrevious] = useState([]);
const [itemsperslide, setitemsperslide] = useState(3);
const [upcoming, setUpcoming] = useState([]);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [showModal, setShowModal] = useState(false);
const [showPatient, setShowPatient] = useState(false);
const code = localStorage.getItem('token');
const [notes, setNotes] = useState({notes:''});

// Function to get previous and upcoming appointments from the API and set the state for previous and upcoming appointments accordingly
  useEffect(() => {
    const today = new Date().toISOString();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in format yyyy-mm-dd

    if (!props.user || props.user.title !== 'client') {
      Promise.all([
        axios.get(`http://localhost:1337/api/appointments?populate=*&filters[patient][id]$eq=${props.patient.id}&filters[start][$lt]=${currentDate}`),
        axios.get(`http://localhost:1337/api/appointments?populate=*&filters[patient][id]$eq=${props.patient.id}&filters[start][$gte]=${today}`)
      ])
        .then(([previousResponse, upcomingResponse]) => {
          setPrevious(previousResponse.data.data.slice(0, 9).sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start)));
          setUpcoming(upcomingResponse.data.data.slice(0, 9).sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start)));
        })
        .catch(error => console.log(error.message));
    } else {
      Promise.all([
        axios.get(`http://localhost:1337/api/appointments?populate=*&filters[client][id]$eq=${props.client.id}&filters[start][$lt]=${currentDate}`),
        axios.get(`http://localhost:1337/api/appointments?populate=*&filters[client][id]$eq=${props.client.id}&filters[start][$gte]=${today}`)
      ])
        .then(([previousResponse, upcomingResponse]) => {
          setPrevious(previousResponse.data.data.slice(0, 9).sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start)));
          setUpcoming(upcomingResponse.data.data.slice(0, 9).sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start)));
        })
        .catch(error => console.log(error.message));
    }
  }, [props.user, props.user.id, props.client, props.patient.id]);


  // handle for when the view appointment button is clicked and displays popup with relevant 
  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

   // handle for when the view appointment button is clicked and displays popup with relevant 
   const handleViewPatient = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPatient(true);
  };

  // handle for when an event is clicked, the user has the option to delete the booking
  const handleEventClick = async () => {
    if (window.confirm(`Are you sure you want to delete the booking '${selectedAppointment.attributes.title}'?`)) {
      try {
        // Delete the appointment using the API
        const response = await fetch(`http://localhost:1337/api/appointments/${selectedAppointment.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
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

   // handle for when an event is clicked, the user has the option to delete the booking
  const editNotes = async () => {
    const note = prompt('Add notes');
    console.log(note);
    if (note) {
      setNotes({
        data: {
          notes: note
        },
      });
    }
  }

  // save the edited notes and send them to the API
   const save = async () => {
    if (window.confirm(`Are you sure you want to add these notes '${selectedAppointment.attributes.title}'?`)) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${code}`
          }
        };
        const body = JSON.stringify(notes); // update the body with the correct payload format
        const response = await axios.put(`http://localhost:1337/api/appointments/${selectedAppointment.id}`, body, config);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert('There was an error adding notes.');
      }
      window.location.reload(false);
    }
  };
  
  // resize the carousel depending on the amount of size of the window and the amount of appointments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setitemsperslide(1);
      } else if (window.innerWidth < 992) {
        setitemsperslide(2);
      } else {
        setitemsperslide(3);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // functions to make the carousel responsive by adding and taking away the number of entries
  const chunks = upcoming.reduce((acc, curr, i) => {
    if (i % itemsperslide === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);
  const pchunks = previous.reduce((acc, curr, i) => {
    if (i % itemsperslide === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  // map upcoming bookings to the upcoming carousel
  const upcomingBooking = chunks.length > 0 ? chunks.map((chunk, i) => (
    <Carousel.Item key={i}>
      <div className="d-flex justify-content-around">
        {chunk.map((value) => (
          <Card className="text-center" key={value.id}>
            <Card.Body className="appointmentCard">
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{value.attributes.patient.data.attributes.username}</Card.Text>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <div className='profileButton'>
                <button className='themeButton' type="button" onClick={() => handleViewAppointment(value)}>View Appointment</button>
              </div>
              <div className='profileButton'>
                <button className='themeButton' type="button" onClick={() => handleViewPatient(value)}>View Patient</button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Carousel.Item>
  )) : (
    <div className="text-center">
      <p>No upcoming appointments.</p>
    </div>
  );

  // map previous bookings to the previous carousel
  const previousBooking = pchunks.length > 0 ? pchunks.map((chunk, i) => (
    <Carousel.Item key={i}>
      <div className="d-flex justify-content-around">
        {chunk.map((value) => (
          <Card className="text-center" key={value.id}>
            <Card.Body className="appointmentCard">
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{value.attributes.patient.data.attributes.username}</Card.Text>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <div className='profileButton'>
                <button className='themeButton' type="button" onClick={() => handleViewAppointment(value)}>View Appointment</button>
              </div>
              <div className='profileButton'>
                <button className='themeButton' type="button" onClick={() => handleViewPatient(value)}>View Patient</button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Carousel.Item>
  )) : (
    <div className="text-center">
      <p>No previous appointments.</p>
    </div>
  );

  return (
    <Container className='content'>

      <div>
        <Card className="appointments" style={{padding:"20px"}}>
          <Timetable user={props.user} patient={props.patient} client={props.client}/>
        </Card>
      </div>

      <div >
        <h4 className='homeheader'>Upcoming appointments</h4>
        <Carousel className='appointments'
          prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
          indicators={false}
          itemsperslide={itemsperslide}
        >
          {upcomingBooking}
        </Carousel>
      </div>

      <div>
        <h4 className='homeheader'>Previous appointments</h4>
          <Carousel className='appointments'
            prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
            indicators={false}
            itemsperslide={itemsperslide}
          >
          {previousBooking}
        </Carousel>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Patient:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.username}</p>
          <p><strong>Client:</strong>     {selectedAppointment && selectedAppointment.attributes.client.data.attributes.username}</p>
          <p><strong>Title:</strong>    {selectedAppointment && selectedAppointment.attributes.title}</p>
          <p><strong>Start:</strong>    {selectedAppointment && new Date(selectedAppointment.attributes.start).toLocaleString()}</p>
          <p><strong>End:</strong>      {selectedAppointment && new Date(selectedAppointment.attributes.end).toLocaleString()}</p>
          <p><strong>Type:</strong>     {selectedAppointment && selectedAppointment.attributes.type}</p>
          <p><strong>Notes:</strong>    {selectedAppointment && selectedAppointment.attributes.notes}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={save}>Save</Button>
          <Button variant="primary" onClick={editNotes}>Edit Notes</Button>
          <Button variant="danger" onClick={handleEventClick}>Cancel Appointment</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPatient} onHide={() => setShowPatient(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Patient:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.username}</p>
          <p><strong>Sex:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.sex}</p>
          <p><strong>Height:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.height}</p>
          <p><strong>Weight:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.weight}</p>
          <p><strong>Blood Type:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.blood_type}</p>
          <p><strong>Diet:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.diet}</p>
          <p><strong>Pregnant:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.pregnant}</p>
          <p><strong>Smoke:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.smoke}</p>
          <p><strong>Allergies:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.allergies}</p>
          <p><strong>Conditions:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.current_conditions}</p>
          <p><strong>Prescriptions:</strong>  {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.prescriptions}</p>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default Appointments;
