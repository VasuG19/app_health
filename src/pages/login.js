import axios from 'axios';
import { useState } from 'react';
import { Form, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


/**
 * login componant
 * 
 * called to allow the user to login to the webpage
 * 
 * @author Mehtab Gill
 */

const Login = (props) => {

  // username and password variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate()


  // handle submitting the username and password to the database and verifying the credentials 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });
      localStorage.setItem('token', response.data.jwt);
      props.handleAuthenticated(true) // set the user to authenticated
      console.log(response);
      nav("/");
    } catch (error) {
      console.error(error);
      alert("Incorrect username or password")
    }
  }

  // return the login form componant 
  return (
      <Container className='content'>
        <div className='login'>
          <div className="text-center">
            <Card className='formcard'>
            <h1><strong>Login</strong></h1>
              <Form className="loginForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group><br/>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group><br/>
                <button className='themeButton' type="submit">Login</button>
              </Form>
              <h6>
                Click <Link to="/register">Here</Link> to register as a patient
              </h6>
                or
              <p>
                 <Link to="/client-register">Here</Link> to register as a client
              </p>
              or
              <p>
                 <Link to="/forgot">Here</Link> to register reset your password
              </p>
            </Card>
          </div>
        </div>
      </Container>
    );
  };

export default Login;
