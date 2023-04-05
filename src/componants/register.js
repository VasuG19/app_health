import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/api/auth/local/register', {
        email: email,
        username: username,
        password: password,
      });
    } catch (error) {
      console.error(error);
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
                            <Form.Control placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group><br/>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group><br/>
                           
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
