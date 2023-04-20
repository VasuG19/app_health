import { React, useState, useEffect } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function HomePage(props) {
  const [previous, setPrevious] = useState([]);
  const [itemsperslide, setitemsperslide] = useState(3);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in format yyyy-mm-dd

   if (!props.user ||props.user.title!== 'Admin') {

    fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq=${props.user.id}&filters[start][$lt]=${currentDate}`)
      .then((response) => response.json())
      .then((json) => setPrevious(json.data))
      .catch((err) => console.log(err.message));

    fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq=${props.user.id}&filters[start][$gte]=${today}`)
      .then((response) => response.json())
      .then((json) => setUpcoming(json.data))
      .catch((err) => console.log(err.message));

   } else if (props.user ||props.user.title!== 'Admin'){

    fetch(`http://localhost:1337/api/appointments?populate=*&filters[start][$lt]=${currentDate}`)
      .then((response) => response.json())
      .then((json) => setPrevious(json.data))
      .catch((err) => console.log(err.message));

    fetch(`http://localhost:1337/api/appointments?populate=*&filters[start][$gte]=${today}`)
      .then((response) => response.json())
      .then((json) => setUpcoming(json.data))
      .catch((err) => console.log(err.message));
   }
  }, [props.user, props.user.id]);

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
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <Link to={`/Appointment`}>
                <Button type="submit"> View calendar </Button>
              </Link>
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
              <Card.Title>{value.attributes.title}</Card.Title>
              <Card.Text>{new Date(value.attributes.start).toLocaleDateString()}</Card.Text>
              <Link to={`/Appointment`}>
                <Button type="submit"> View calendar </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Carousel.Item>
  ));

  return (
    <div className="home">

      <h4 className='homeheader'>Upcoming appointments</h4>
      <div className='appointments'>
        <Carousel
          prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
          indicators={false}
          itemsperslide={itemsperslide}
        >
          {upcomingBooking}
        </Carousel>
      </div>

      <h4 className='homeheader'>Previous appointments</h4>
      <div>
        <Carousel className='appointments'
          prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
          indicators={false}
          itemsperslide={itemsperslide}
        >
          {previousBooking}
        </Carousel>
      </div>

    </div>
  );
}

export default HomePage;
