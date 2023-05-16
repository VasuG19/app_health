import axios from 'axios';
import { useState } from 'react';
import { Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


/**
 * First login componant
 * 
 * The only purpose for this login componant is to redirect the user to the title page for verification
 * This componant is only called after a user registers with us and it sends the user to the userTitle.js page
 * after the user has registered and logged in for the first time
 * 
 * @author Mehtab Gill
 */

const FirstLogin = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  // handle submitting the username and password to the database and verifying the credentials 
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
      alert("Incorrect username or password")
    }
    nav("/userTitle"); // redirect user to the userTitle page for verification once logged in
  }

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
            </Card>
          </div>
        </div>
      </Container>
    );
  };

export default FirstLogin;
