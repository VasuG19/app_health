import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
      alert("Incorrect username or password")
    }
  }

  return (
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
              <Button type="submit">Login</Button>
            </Form>
            <h6>
              Click <Link to="/register">Here</Link> to register
            </h6>
          </Card>
        </div>
      </div>
    );
  };

export default Login;
