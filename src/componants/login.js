import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';

function Login(){

    const initialUser = {password: "", identifier: ""}
    const [user, setUser] = useState(initialUser)
    
    const handleChange = (event) => {
        setUser(event.target.value);
    }

    const handleLogin = async() => {
        const url = "http://localhost:1337api/auth/local";
        try{
            if(user.identifier && user.password){
                const res = await axios.post(url, user);
                console.log({res});
            }
        } catch(error){

        }
    };

    return( 
            <Row className="loginForm">
                
                <Col sm="12" md="5" >
                    <h1><strong>Login</strong></h1><br/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                                type="email" 
                                name="identifier" 
                                value={user.identifier} 
                                onChange={handleChange}
                                placeholder="Email"/>
                        </Form.Group><br/>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password" 
                                name="identifier" 
                                value={user.identifier}
                                onChange={handleChange}
                                placeholder="Password"/>
                        </Form.Group><br/>

                        <div className="form-group">
                            <Button variant="primary"  onClick={handleLogin} value="submit">Log In</Button>
                        </div>
                    </Form>
                </Col>        
            </Row>
    )
}

export default Login;