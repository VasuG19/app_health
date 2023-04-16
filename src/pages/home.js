import {React} from 'react';
import { Button, Card } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function HomePage(props){

const [data, setData] = useState([]);
console.log(props.user.id)

// retrieve appointments from API
  useEffect( () => {
    fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq]=${props.user.id}`)
    .then((response) => response.json())
    .then((json) => {setData(json.data); console.log(json.data)})
    .catch((err) => {console.log(err.message)});
}, []);

    const accountData = data.map((value) =>
        <Carousel.Item key={value.id}>
            <Card className="text-center" border='dark'>
                <Card.Body className='appointmentCard'>
                    <Card.Title>{value.attributes.start}</Card.Title>
                    <Card.Text>{value.attributes.title}</Card.Text>
                    <Link to={`/Appointment`}>
                        <Button type="submit" export={value.id}> View Product </Button>
                    </Link>
                </Card.Body>
            </Card> 
        </Carousel.Item>
    )

    return(
        <div className='home'>
            <Carousel
                      prevIcon={<FontAwesomeIcon 
                      icon={faChevronLeft} />} 
                      nextIcon={<FontAwesomeIcon 
                      icon={faChevronRight} />}>
                      {accountData}
            </Carousel>
        </div>
    )}

export default HomePage