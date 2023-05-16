import {React} from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * Verify Page 
 * 
 * This page is used to verify the user as a client or a patient
 * depending upon which rigister route they took when registering
 * It will create an entry into either the patient or client table
 * and then set the relation between that table and the current user
 * 
 * @author Mehtab Gill
 */

function UserTitle(props){
    
    //declare variables
    const [user, setUser] = useState({username:'', user:''})
    const [verify, setVerify] = useState(false)
    const nav = useNavigate();

    // set the user data to send to the api when creating patient or client entry
    const userData = async () => {
        setUser({
            data: {
                username: props.user.username, 
                user: props.user.id
            },
        });
        setVerify(true);
    }

    // handle creating the entry into either the client or patient table depending on the user's title
    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                'Content-Type': 'application/json',
                }
            };
            const userData = JSON.stringify(user)
            console.log(userData)
            if (!props.user ||props.user.title!== 'client') { // create patients entry and relation if user is a patient
                const result = await axios.post(`http://localhost:1337/api/patients`, userData, config);
                console.log(result)
            } else {                                          // create client entry and relation if user is a client 
                 const result = await axios.post(`http://localhost:1337/api/clients`, userData, config);
                 console.log(result)
            }
        } catch (error) {
        console.error(error);
        alert('There was an error adding notes.');
        }
        nav("/profile"); // redirect user to profile page once registered
    };

    // return the verify form
    return(
        <Container className='content'>
                    
                    <Row className="loginForm">
        <Col sm={true} >
            <Card className="text-center">
                <div className='formcard'>
                <h1><strong>Welcome {props.user.username}!</strong></h1>
                    <h6>Please press this button to verify yourself</h6>
                    <div className="d-flex justify-content-center mb-2">
                        <div className='profileButton'><Button className='themeButton' variant='primary' onClick={userData} >Verify</Button></div>
                    {verify && <div className='profileButton'><Button className='themeButton' variant='success' onClick={handleSubmit} >Continue</Button></div>}
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
        </Container>
    )}

export default UserTitle