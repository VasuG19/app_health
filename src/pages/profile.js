import React from 'react';
import { Button, Row, Col, Card } from "react-bootstrap";

const Profile = (props) => {

  return (
    <div>
    <h1>Welcome! {props.user.username}</h1>
      <Row>
          <Col>
          <div>{props.user.appointments.context}</div>
          </Col>
      </Row>
    </div>
  );
};

export default Profile