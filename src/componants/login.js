import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Profile from '../pages/profile';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });
      
      localStorage.setItem('token', response.data.jwt);
      props.handleAuthenticated(true)
      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  }

  // retrieve token to handle whether the user is authenticated
  useEffect(
    () => {
      if (localStorage.getItem('token')) {
        props.handleAuthenticated(true)
      }
    }
  ,[props])

  const handleSignOut = () => {
    props.handleAuthenticated(false)
    localStorage.removeItem('token')
    setPassword("");
    setUsername("");
  }

  return (
      <div>
        { props.authenticated && 
          <div>
            <div><Button classname="logout" type="button" value="Sign out" onClick={handleSignOut}>Sign out</Button></div>
            <Profile />
          </div>
        }
        {!props.authenticated && 
          <Row className="loginForm">
              <Col sm="12" md="5" >
                  <Card className="text-center" border='dark'>
                      <div className='formcard'>
                      <h1><strong>Login</strong></h1>
                          <Form className="loginForm" onSubmit={handleSubmit}>
                              <Form.Group className="mb-3" controlId="formBasicUsername">
                                  <Form.Control placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                              </Form.Group><br/>
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                  <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </Form.Group><br/>
                              <Button type="submit">Login</Button>
                          </Form>
                          <h6>
                            Click <Link to="/register">Here</Link> to register
                          </h6>
                      </div>
                  </Card>
              </Col>
          </Row>
        }
      </div>
    );
  };

export default Login;
