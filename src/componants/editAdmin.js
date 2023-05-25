import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row, Container } from 'react-bootstrap';

/**
 * edit Admin componant
 * 
 * this componant is called within the admin page to allow the client to edit and add their personal client data
 * also allows the user to change their password if they choose to
 * 
 * @author Mehtab Gill
 */

const EditAdmin = (props) => {

    // declare variables
    const [updateData, setUpdateData] = useState({
        username:props.username, email: props.email, password: '', passwordConfirmation: '', 
        currentPassword: '', institute:props.institute, address:props.address, role: props.role
    });
    const { username, email,password, passwordConfirmation, currentPassword, institute, address, role} = updateData; 
    const handleChange = e => setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    const code = localStorage.getItem('token');

    // handle submitting updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const config = {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${code}`
                    }
                };
                const body = JSON.stringify({username, email,  });
                const CL = JSON.stringify({data:{institute, address, role}});
                const result = await axios.put(`http://localhost:1337/api/users/${props.user.id}`, body, config);
                const resultCL = await axios.put(`http://localhost:1337/api/clients/${props.user.client.id}`, CL, config);
                console.log(result)
                console.log(resultCL)
            } catch (error) {
                console.error(error);
            }
        props.onClose();
        window.location.reload(false);
    }

    // sepperate button to allow the user to save their new password as this needs extra verification
    const changePass = async (e) => {
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
                const passwordReset = JSON.stringify({ password, passwordConfirmation, currentPassword })
                const reset = await axios.post(`http://localhost:1337/api/auth/change-password`, passwordReset, config);
                console.log(reset)
            } catch (error) {
                console.error(error);
                alert("there was an error changing your password")
            }
        }
        props.onClose();
        window.location.reload(false);
    }

    return (
        <Container className='content'>
        <h2>Edit Profile</h2>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                    Username:<Form.Control type="text" name='username' value={username} onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    Email:<Form.Control type="email" name='email' value={email} onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                    Institute:<Form.Control type="text" name='institute' value={institute} onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    Address:<Form.Control type="text" name='address' value={address} onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    Role:<Form.Control type="text" name='role' value={role} onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    New Password:<Form.Control type="text" name='password' value={password} onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicBlood">
                    Confirm Password:<Form.Control type="text" name='passwordConfirmation' value={passwordConfirmation} onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    Current Password:<Form.Control type="text" name='currentPassword' value={currentPassword} onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <hr />

        

            <div className="d-flex justify-content-center mb-2">
                <div className='profileButton'><button className='themeButton' type="submit" >Save</button></div>
                <div className='profileButton'><button className='themeButton' type="button" onClick={changePass} >change password</button></div>
                <div className='profileButton'><button className='themeButton' type="button"  onClick={props.onClose}>Cancel</button></div>
            </div>
        </Form>
        </Container>
    );
}

export default EditAdmin;

