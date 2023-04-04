import {React, useEffect, useState} from 'react';
import { Button, Card, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function ServicesPage(){

    // declare variables
    const [Clients, setClients] = useState([]);

    // retrieve appointments from API
    const database = "http://localhost:1337/api/clients";
    useEffect( () => {
        fetch(database)
        .then((response) => response.json())
        .then((json) => {setClients(json.data)})
        .catch((err) => {console.log(err.message)});
    },[]);

    const Services = Clients.map((value) =>
        <Col key={value.id}>
            <Card className='card'>
                <Card.Body className='appointmentCard'>
                    <Card.Title>{value.attributes.first_name}</Card.Title>
                    <Card.Text>{value.attributes.last_name}</Card.Text>
                    <Card.Text>{value.attributes.Role}</Card.Text>
                    <Card.Text>{value.attributes.Institute}</Card.Text>
                    <Card.Text>{value.attributes.client_email}</Card.Text>
                    <Link to={"/"}>
                        <Button type="submit" export={value.id}> View Product </Button>
                    </Link>
                </Card.Body>
            </Card> 
        </Col>
    )

    return(
        <div className='home'>
            <Row>
                {Services}
            </Row>
        </div>
    )}

export default ServicesPage