import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
  });

  const { username, email, password, confirmPassword } = formData; 

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    } else {
      try {

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify({
          username,
          email,
          password,
          userType: 'patient'
        });

      const result = await axios.post('http://localhost:1337/api/auth/local/register', body, config);
      console.log(result.data)
    } catch (error) {
      console.error(error);
    }
  }
};

return (
  <Row className="loginForm">
      <Col sm="12" md="5" >
          <Card className="text-center" border='dark'>
              <div className='formcard'>
              <h1><strong>Register</strong></h1>
                  <Form className="loginForm" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control 
                            placeholder="Email" 
                            name="email" type="text" 
                            value={email} 
                            onChange={handleChange} />
                      </Form.Group><br/>

                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Control 
                            placeholder="username" 
                            name='username' 
                            type="text" 
                            value={username} 
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
                              name='confirmPassword'
                              value={confirmPassword}
                              onChange={handleChange}
                              minLength='6'
                              required />
                      </Form.Group><br/>
                      <Button type="submit">Register</Button>
                  </Form>
              </div>
          </Card>
      </Col>
  </Row>
  );
};

export default Register;
