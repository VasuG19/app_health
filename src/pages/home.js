import React, { useState, useEffect } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function HomePage(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq]=${props.user.id}`)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((err) => console.log(err.message));
  }, [props.user.id]);

  const chunks = data.reduce((acc, curr, i) => {
    if (i % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  const accountData = chunks.map((chunk, i) => (
    <Carousel.Item key={i}>
      <div className="d-flex justify-content-around">
        {chunk.map((value) => (
          <Card className="text-center" border="dark" key={value.id}>
            <Card.Body className="appointmentCard">
                <Card.Title>{value.attributes.title}</Card.Title>
                <Card.Text>{value.attributes.start}</Card.Text>
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
      <Carousel
        prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
        indicators={false}
        interval={null} // Set interval to null to display all items at once
      >
        {accountData}
      </Carousel>
    </div>
  );
}

export default HomePage;
