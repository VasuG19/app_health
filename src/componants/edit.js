import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';

const EditProfile = (props) => {
  const [updateData, setUpdateData] = useState({
        username:props.username, email: props.email, blood_type: props.blood_type, first_name:props.user.first_name,
        last_name:props.user.last_name, prescriptions:props.user.prescriptions, allergies:props.user.allergies,
        height:props.user.height, weight:props.user.weight, phone:props.user.phone,birthday:props.user.birthday, 
        address:props.user.address, diet:props.user.diet, current_conditions:props.user.current_conditions
  });

  const { 
    username, email, blood_type, first_name , last_name , prescriptions , allergies ,
    height , weight , phone , birthday, address , diet , current_conditions 
    } = updateData; 

  const handleChange = e =>
  setUpdateData({ ...updateData, [e.target.name]: e.target.value });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({username, email, blood_type, first_name , last_name , prescriptions , allergies ,
        height , weight , phone , birthday, address , diet , current_conditions });
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

        <div className="d-flex justify-content-center mb-2">
            <Button type="submit" className='profileButton'>Save</Button>
            <Button type="button" className='profileButton' onClick={props.onClose}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;

