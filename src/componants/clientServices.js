import React, { useEffect } from 'react';
import { useState } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';

/**
 * popup componant
 * 
 * componant to be called and display a popup with relevant appointment data
 * 
 * @author Mehtab Gill
 */

function ClientServices(props) {

  const [services, setServices] = useState([])

  useEffect(() => {
    setServices(props.clients.attributes.services.data);
  },[props.clients.attributes.services.data]);

  const allServices = services.map((value) =>
    <Card key={value.id} className="mb-4 profile">
      <Card.Body>
        <Card.Title>{value.attributes.title}</Card.Title>
        <hr/>
          {value.attributes.desc}
      </Card.Body>
    </Card>
  )
  // return the popup data
  return (
    <div>
        <Container className="py-5">
          <Row>
            <Col sm="true">
                 {allServices}
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default ClientServices;
