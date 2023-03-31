import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function HomePage(props){

    const bookings = props.bookings.map((value) =>
        <Carousel.Item key={value.id}>
            <Card className='card'>
                <Card.Body className='appointmentCard'>
                    <Card.Title>{value.attributes.Date}</Card.Title>
                    <Card.Title>{value.attributes.patient.data.attributes.first_name}</Card.Title>
                    <Card.Text>{value.attributes.Context}</Card.Text>
                </Card.Body>
                <Card.Footer>
                <Link to="/Appointment"><Button>Home</Button></Link>
                </Card.Footer>
            </Card> 
        </Carousel.Item>
    )

    return(
        <div className='home'>
            <h1>Welcome to Health+!</h1>                
            <Carousel className='upcoming' 
                      prevIcon={<FontAwesomeIcon 
                      icon={faChevronLeft} />} 
                      nextIcon={<FontAwesomeIcon 
                      icon={faChevronRight} />}>
                {bookings}
            </Carousel>
        </div>
    )}

export default HomePage