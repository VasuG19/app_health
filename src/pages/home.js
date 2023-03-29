import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Button, CarouselItem } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * Home Page
 * 
 * function to return home page data with relevant information and images
 * 
 * @author Mehtab Gill
 */

function HomePage(){
    return(
        <div className='home'>
            
            <div className='hometext'>
             <h1>Welcome to Health+!</h1>
                
            </div>

            <Carousel>

                <CarouselItem>
                    <Card>
                    <Card.Body>
                    <Card.Title>title</Card.Title>
                            <ListGroup variant="flush">
                            <ListGroup.Item><strong>Award: </strong></ListGroup.Item>
                            <ListGroup.Item><strong>Track: </strong></ListGroup.Item>
                            <ListGroup.Item><strong>Authors: </strong></ListGroup.Item>
                            <ListGroup.Item><strong>Abstract: </strong></ListGroup.Item>
                            </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="primary">Show Details</Button>
                    </Card.Footer>
                            </Card>
                </CarouselItem>

            </Carousel>

        </div>
)}

export default HomePage