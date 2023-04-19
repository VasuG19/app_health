import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';

const EditProfile = (props) => {
  const [updateData, setUpdateData] = useState({
        username:props.username, email: props.email, blood_type: props.blood_type, first_name:props.first_name,
        last_name:props.last_name, prescriptions:props.prescriptions, allergies:props.allergies,
        height:props.height, weight:props.weight, phone:props.phone,birthday:props.birthday, 
        address:props.address, diet:props.diet, current_conditions:props.current_conditions, smoke:props.smoke,
        pregnant:props.pregnant
  });

  const { 
    username, email, blood_type, first_name , last_name , prescriptions , allergies ,
    height , weight , phone , birthday, address , diet , current_conditions, smoke, pregnant
    } = updateData; 

  const handleChange = e => setUpdateData({ ...updateData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            username, email, blood_type, first_name, last_name, prescriptions, allergies, height , 
            weight, phone, birthday, address, diet, current_conditions, smoke, pregnant 
        });
        const result = await axios.put(`http://localhost:1337/api/users/${props.user.id}`, body, config);
        console.log(result.data)
    } catch (error) {
        console.error(error);
    }
    props.onClose();
    window.location.reload(false);
  }

  return (
    <div>
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
                <Form.Group className="mb-3" controlId="formBasicBlood">
                Blood_type:<Form.Control type="text" name='blood_type' value={blood_type} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                Weight:<Form.Control type="text" name='weight' value={weight} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                Phone:<Form.Control type="text" name='phone' value={phone} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicBlood">
                Birthday:<Form.Control type="text" name='birthday' value={birthday} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                First name:<Form.Control type="text" name='first_name' value={first_name} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                Last name:<Form.Control type="text" name='first_name' value={last_name} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                Prescriptions:<Form.Control type="text" name='prescriptions' value={prescriptions} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                Height:<Form.Control type="text" name='height' value={height} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicBlood">
                Allergies:<Form.Control type="text" name='allergies' value={allergies} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                Address:<Form.Control type="text" name='address' value={address} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                Diet:<Form.Control type="text" name='diet' value={diet} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicBlood">
                Current conditions:<Form.Control type="text" name='current_conditions' value={current_conditions} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                Pregnant:<Form.Control type="text" name='pregnant' value={pregnant} onChange={handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicBlood">
                Smoke:<Form.Control type="text" name='smoke' value={smoke} onChange={handleChange}/>
                </Form.Group>
            </Col>
        </Row>

        <div className="d-flex justify-content-center mb-2">
            <div className='profileButton'><Button type="submit" >Save</Button></div>
            <div className='profileButton'><Button type="button"  onClick={props.onClose}>Cancel</Button></div>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;

