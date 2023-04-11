import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container'

const Profile = (props) => {

  return (
    <div>
    <h1>Welcome! {props.user.first_name}</h1>
    <Container>
      <Row>
          <Col xs={6} md={4}>
          <Card>{props.user.Blood_type}</Card>
          </Col>

          <Col xs={12} md={8}>
          <Card>{props.user.Weight}</Card>
          </Col>
      </Row>

      <Row>
        <Col>
          <Card>{props.user.Prescriptions}</Card>
        </Col>
          
        <Col>
          <Card>{props.user.Allergies}</Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Profile