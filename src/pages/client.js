import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClientCal from "../componants/clientCal";
import ClientServices from "../componants/clientServices";


/**
 * client Page 
 * 
 * Retrieves and displays all clients and data
 * Gives the use an option to view client data 
 * and book appointments through calendar componants
 * 
 * @author Mehtab Gill
 */

function Clients(props) {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false); // state for modal show/hide
  const [showServices, setShowServices] = useState(false); // state for modal show/hide
  const [selectedClient, setSelectedClient] = useState(null); // state for selected client

  const nav = useNavigate();

  // if the user is a patient, retrieve all clients from the database 
  useEffect(() => {
    if (!props.user || props.user.title !== "client") {
      nav("/clients");
      try {
      const getUserData = async () => {
        const response = await axios.get(
          "http://localhost:1337/api/clients?populate=*"
        );
        setClients(response.data.data);
      };
      getUserData();
      } catch (error) {
        console.error(error.message);
      }
    } else { // if the user is a client, redirect to an error page as the user must be a patient to book an appointment
      nav("/clientError");
    }
  }, [nav, props.user]);

  // show the calendar popup when the button is clicked
  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShow(true);
  };

  // show the services popup when the button is clicked
  const handleClientClickServices = (client) => {
    setSelectedClient(client);
    setShowServices(true);
  };

  // map the client data for each client, calling the relevant client data from the array
  const allCients = clients && clients.map((value) => (
      <Col sm={6} md={6} lg={4} style={{padding:'10px'}} key={value.id}>
        <Card>
          <Card.Body>
            <Row>
              <Col className="clientName" sm="true">
                <Card.Text>{value.attributes.username}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text>Institute</Card.Text>
              </Col>
              <Col sm="5" className="clientName">
                <Card.Text className="text-muted">
                  {value.attributes.institute}
                </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text>Address</Card.Text>
              </Col>
              <Col sm="5" className="clientName">
                <Card.Text className="text-muted">
                  {value.attributes.address}
                </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text>Role</Card.Text>
              </Col>
              <Col sm="5" className="clientName">
                <Card.Text className="text-muted">
                  {value.attributes.role}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
            <Card.Footer className="clientName">
            <div className='profileButton'><button className="themeButton" onClick={() => handleClientClick(value)}>View Appointments</button></div>
            <div className='profileButton'><button className="themeButton" onClick={() => handleClientClickServices(value)}>View Services</button></div>
            </Card.Footer>
        </Card>
      </Col>
    ));

    // Display all clients with relevant services and calendar
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

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Client Calendar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientCal user={props.user} client={selectedClient} />
            </Modal.Body>
          </Modal>

          <Modal show={showServices} onHide={() => setShowServices(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Client Services</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientServices clients={selectedClient}/>
            </Modal.Body>
          </Modal>

        </Container>
    )
}

export default Clients;