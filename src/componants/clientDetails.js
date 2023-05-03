import {React} from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * Services Page 
 * 
 * function to return services data with relevant information
 * 
 * @author Mehtab Gill
 */

function ServicesPage(props){
    
    const [clientData, setClientData] = useState({username:'', user:''})
    const [verify, setVerify] = useState(false)
    const nav = useNavigate();

    // handle submitting updated data
      const addService = async () => {
            setClientData({
                data: {
                    username: props.user.username, 
                    user: props.user.id
                },
            });

            setVerify(true);
        }

    const handleSubmit = async () => {
    const code = localStorage.getItem('token');

        try {
            const config = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`
                }
            };
            console.log(clientData)
            const client = JSON.stringify(clientData)
            if (!props.user ||props.user.title!== 'client') {
                const result = await axios.post(`http://localhost:1337/api/patients`, client, config);
                console.log(result)
            } else {
                 const result = await axios.post(`http://localhost:1337/api/clients`, client, config);
                 console.log(result)
            }
        } catch (error) {
        console.error(error);
        alert('There was an error adding notes.');
        }
        nav("/profile"); // redirect user to login page once registered
    };

    return(
        <Container className='content'>
                    
                    <Row className="loginForm">
        <Col sm={true} >
            <Card className="text-center">
                <div className='formcard'>
                <h1><strong>Welcome {props.user.username}!</strong></h1>
                    <h6>Please press this button to verify yourself</h6>
                    <div className="d-flex justify-content-center mb-2">
                        <div className='profileButton'><Button className='themeButton' variant='primary' onClick={addService} >Verify</Button></div>
                    {verify && <div className='profileButton'><Button className='themeButton' variant='success' onClick={handleSubmit} >Continue</Button></div>}
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
        </Container>
    )}

export default ServicesPage