import axios from 'axios';
import { useState } from 'react';
import { Form, Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * register componant
 * 
 * componant called to register a user to the database
 * 
 * @author Mehtab Gill
 */

const Register = () => {

  // declare the data
  const [formData, setFormData] = useState({
    email: '', username: '', first_name: '',
    last_name:'', password: '', confirmPassword: ''
  });

  const { username, email, password, confirmPassword,first_name,last_name, } = formData; 
  const nav = useNavigate();

  // target the correct input when typing in the form fields
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle submitting the form data to the database to register the user 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { // validate that both password entries match
      console.log('Passwords do not match');
    } else {
      try {
        const config = {headers: {'Content-Type': 'application/json'}};
        const body = JSON.stringify({username, email, password, first_name,last_name,});
        console.log("body",body)
        const result = await axios.post('http://localhost:1337/api/auth/local/register', body, config);
        console.log(result.data)
        nav("/login"); // redirect user to login page once registered
      } catch (error) {
      console.error(error);
      alert("there was an error registering your account, please try again")
    }
  }
};

//display the register form
return (
  <Container className='content'>
    <Row className="loginForm">
        <Col sm="12" md="5" >
            <Card className="text-center">
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

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control 
                              placeholder="First Name" 
                              name='first_name' 
                              type="text" 
                              value={first_name} 
                              onChange={handleChange} />
                        </Form.Group><br/>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control 
                              placeholder="Last Name" 
                              name='last_name' 
                              type="text" 
                              value={last_name} 
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
                        <button className='themeButton' type="submit">Register</button>
                    </Form>
                </div>
            </Card>
        </Col>
    </Row>
  </Container>
  );
};

export default Register;
