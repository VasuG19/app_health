import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row, Container, Card } from 'react-bootstrap';

/**
 * edit componant
 * 
 * this componant is called within the profile page to allow the user to edit and add their personal health data
 * also allows the user to change their password if they choose to
 * 
 * @author Mehtab Gill
 */

const ForgotPass = (props) => {

    // declare variables
  const [email, setEmail] = useState('');
  const handleChange = e => setEmail(e.target.value);


   // handle submitting updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/auth/forgot-password', {email: email});
            console.log(response.data)
            console.log(email)
            alert("You recieved an email! Follow the instructions to reset your password")
        } catch (error) {
            console.error(error);
            alert("There was an error sending the reset link to your email")
        }
    window.location.reload(false);
  }

//window.location.reload(false);
  return (
    <Container className='content'>
        <Row className="loginForm">
        <Col sm="12" md="5" >
            <Card className="text-center">
                <div className='formcard'>
                <h1><strong>Reset Password</strong></h1>
                    <Form className="loginForm" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                              placeholder="Email" 
                              name="email" type="text" 
                              value={email.email} 
                              onChange={handleChange} />
                        </Form.Group><br/>
                            
                        <button className='themeButton' type="submit">Reset Password</button>
                    </Form>
                </div>
            </Card>
        </Col>
    </Row>
    </Container>
  );
}

export default ForgotPass;

