import { React, useState, useEffect } from 'react';
import { Button, Card, Carousel, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Appointments(props) {
  const [previous, setPrevious] = useState([]);
  const [itemsperslide, setitemsperslide] = useState(3);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in format yyyy-mm-dd
  
    if (!props.user ||props.user.title!== 'Admin') {

      fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq=${props.user.id}&filters[start][$lt]=${currentDate}`)
        .then((response) => response.json())
        .then((json) => setPrevious(json.data.sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start))))
        .catch((err) => console.log(err.message));
  
      fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq=${props.user.id}&filters[start][$gte]=${today}`)
        .then((response) => response.json())
        .then((json) => setUpcoming(json.data.sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start))))
        .catch((err) => console.log(err.message));

    } else if (props.user ||props.user.title!== 'Admin'){
  
      fetch(`http://localhost:1337/api/appointments?populate=*&filters[start][$lt]=${currentDate}`)
        .then((response) => response.json())
        .then((json) => setPrevious(json.data.sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start))))
        .catch((err) => console.log(err.message));

      fetch(`http://localhost:1337/api/appointments?populate=*&filters[start][$gte]=${today}`)
        .then((response) => response.json())
        .then((json) => setUpcoming(json.data.sort((a, b) => new Date(a.attributes.start) - new Date(b.attributes.start))))
        .catch((err) => console.log(err.message));
    }
  
  },[props.user, props.user.id]);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleEventClick = async () => {
    if (window.confirm(`Are you sure you want to delete the booking '${selectedAppointment.title}'?`)) {
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

  const upcomingBooking = chunks.map((chunk, i) => (
    <Carousel.Item key={i}>
      <div className="d-flex justify-content-around">
        {chunk.map((value) => (
          <Card className="text-center" key={value.id}>
            <Card.Body className="appointmentCard">
              <Card.Title>{value.attributes.patient.data.attributes.username}</Card.Title>
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <Button type="button" onClick={() => handleViewAppointment(value)}>View Appointment</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Carousel.Item>
  ));
  
  const previousBooking = pchunks.map((chunk, i) => (
    <Carousel.Item key={i}>
      <div className="d-flex justify-content-around">
        {chunk.map((value) => (
          <Card className="text-center" key={value.id}>
            <Card.Body className="appointmentCard">
              <Card.Title>{value.attributes.patient.data.attributes.username}</Card.Title>
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <Button type="button" onClick={() => handleViewAppointment(value)}>View Appointment</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Carousel.Item>
  ));

  return (
      <Container className='content'>

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

      <div >
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
          <p><strong>Patient:</strong> {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.username}</p>
          <p><strong>Name:</strong> {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.first_name}-
                                    {selectedAppointment && selectedAppointment.attributes.patient.data.attributes.last_name}</p>
          <p><strong>Title:</strong> {selectedAppointment && selectedAppointment.attributes.title}</p>
          <p><strong>Start:</strong> {selectedAppointment && new Date(selectedAppointment.attributes.start).toLocaleString()}</p>
          <p><strong>Type:</strong> {selectedAppointment && selectedAppointment.attributes.type}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleEventClick}>Cancel Appointment</Button>
        </Modal.Footer>
      </Modal>
      </Container>
  );
}

export default Appointments;