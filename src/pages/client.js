import React, {useEffect, useState} from "react";
import axios from "axios";
import Popup from "../componants/popup";
import { Container, Row, Card, Col } from "react-bootstrap";
import ClientCal from "../componants/clientCal";
import { useNavigate } from "react-router-dom";

/**
 * Admin Page 
 * 
 * Retrieves and displays relevant admin data for the admin
 * 
 * @author Mehtab Gill
 */

function Clients (props){
  // States used in the component
  const [clients, setClients] = useState([]);

  // if the user is the admin, redirect to the admin page
  const nav = useNavigate();
  useEffect(() => {
    if (!props.user ||props.user.title!== 'client') {
        nav("/profile");
      } else {
        nav("/clientError");
      }
  },[nav, props.user]);

    // Use Effect to fetch data on mount and when dependencies change
  useEffect(() => {
          try {
          const getUserData = async () => {
              // Get patient data
              const response = await axios.get('http://localhost:1337/api/clients?populate=*');
              setClients(response.data.data);
          }
          getUserData()
          } catch (error) {
              console.error(error.message);
          }        
    },[props.user]);

    // Map through patients and create card for each
    const allCients = clients && clients.map((value) =>  
            <Col  sm={true} key={value.id}>
                <Card>
                    <Card.Body>
                    <Row>
                    <Col className='clientName' sm="true">
                        <Card.Text>{value.attributes.username}</Card.Text>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <Card.Text>Institute</ Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">{value.attributes.institute}</ Card.Text>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col sm="3">
                      <Card.Text>Address</ Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">{value.attributes.address}</ Card.Text>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col sm="3">
                      <Card.Text>Role</ Card.Text>
                    </Col>
                    <Col sm="9">
                      <Card.Text className="text-muted">{value.attributes.role}</ Card.Text>
                    </Col>
                  </Row>
                  <hr/>
                  <div style={{ height: '250px', overflow: 'scroll' }} >
                        <Popup clients={value} />
                  </div>
                        <ClientCal user={props.user} client={value}/>
                    </Card.Body>
                </Card>
            </Col>
    );

    // Render admin dashboard
    return(
        <Container className="content">
            <Row>
                <Col lg="true">
                    <Row>
                        <Col>
                          <Card.Text> Clients </Card.Text>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        {allCients}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Clients;