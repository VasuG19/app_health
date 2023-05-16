import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row, Container, Card } from 'react-bootstrap';

/**
 * reset componant
 * 
 * This componant is called to reset the users password if they forget it
 * 
 * @author Mehtab Gill
 */

const Reset = (props) => {

    // declare variables
  const [updateData, setUpdateData] = useState({username:props.username, email: props.email, password: '', passwordConfirmation: '' });
  const { username, email, password, passwordConfirmation} = updateData; 
  const handleChange = e => setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  const code = localStorage.getItem('token');

   // handle submitting updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
        console.log('Passwords do not match');
      } else {
        try {
            const config = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`
                }
            };
            const passwordReset = JSON.stringify({ password, passwordConfirmation, username, email  })
            const response = await axios.post('http://localhost:1337/auth/reset-password', passwordReset, config);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    props.onClose();
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
                              value={email} 
                              onChange={handleChange} />
                        </Form.Group><br/>
                            
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control 
                                placeholder="Password" 
                                name='password' 
                                minLength={6} 
                                required type="password" 
                                value={password} 
                                onChange={handleChange} />
                            </Form.Group><br/>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control 
                                placeholder="Confirm Password" 
                                type='password'
                                name='passwordConfirmation'
                                value={passwordConfirmation}
                                onChange={handleChange}
                                minLength='6'
                                required />
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

export default Reset;

