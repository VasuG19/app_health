import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClientCal from "../componants/clientCal";

/**
 * Admin Page 
 * 
 * Retrieves and displays relevant admin data for the admin
 * 
 * @author Mehtab Gill
 */

function Clients(props) {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false); // state for modal show/hide
  const [selectedClient, setSelectedClient] = useState(null); // state for selected client

  const nav = useNavigate();

  useEffect(() => {
    if (!props.user || props.user.title !== "client") {
      nav("/clients");
    } else {
      nav("/clientError");
    }
  }, [nav, props.user]);

  useEffect(() => {
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
  }, [props.user]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShow(true);
  };

  const allCients =
    clients &&
    clients.map((value) => (
      <Col sm={true} key={value.id}>
        <Card>
          <Card.Body>
            <Row>
              <Col className="clientName" sm="true">
                <Card.Text>{value.attributes.username}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="3">
                <Card.Text>Institute</Card.Text>
              </Col>
              <Col sm="9">
                <Card.Text className="text-muted">
                  {value.attributes.institute}
                </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="3">
                <Card.Text>Address</Card.Text>
              </Col>
              <Col sm="9">
                <Card.Text className="text-muted">
                  {value.attributes.address}
                </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="3">
                <Card.Text>Role</Card.Text>
              </Col>
              <Col sm="9">
                <Card.Text className="text-muted">
                  {value.attributes.role}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
            <Card.Footer className="clientName">
              <button className="themeButton" onClick={() => handleClientClick(value)}>View Appointments</button>
            </Card.Footer>
        </Card>
      </Col>
    ));

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

            <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Client Calendar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientCal user={props.user} client={selectedClient} />
            </Modal.Body>
          </Modal>

        </Container>
    )
}

export default Clients;