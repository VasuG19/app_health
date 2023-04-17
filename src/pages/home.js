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

// retrieve appointments from API
  useEffect( () => {
    fetch(`http://localhost:1337/api/appointments?populate=*&filters[patient]$eq]=${props.user.id}`)
    .then((response) => response.json())
    .then((json) => {setData(json.data); console.log(json.data)})
    .catch((err) => {console.log(err.message)});
    }, [props.user.id]);

    const accountData = data.map((value) =>
        <Carousel.Item key={value.id}>
            <div className="text-center">
                <Card.Body className='appointmentCard'>
                    <Card.Title>{value.attributes.title}</Card.Title>
                    <Card.Text>{value.attributes.start}</Card.Text>
                        <Link to={`/Appointment`}>
                            <Button type="submit"> View calendar </Button>
                        </Link>
                </Card.Body>
            </div> 
        </Carousel.Item>
    )

    return(
        <div className='home'>
            <Carousel prevIcon={<FontAwesomeIcon icon={faChevronLeft} />} nextIcon={<FontAwesomeIcon icon={faChevronRight}/>} indicators={false} >
                      {accountData}
            </Carousel>
        </div>
    )}

export default HomePage