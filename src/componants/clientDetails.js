import {React} from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

/**
 * Services Page 
 * 
 * function to return services data with relevant information
 * 
 * @author Mehtab Gill
 */

function ServicesPage(props){
    
    const [clientData, setClientData] = useState({institute:''})

    // handle submitting updated data
      const addService = async () => {
        const institute = prompt('Add title');
        console.log(institute);
        if (institute) {
            setClientData({
            data: {
                institute: institute,
                user: props.user.id
            },
          });
        }
      }

    const save = async () => {
        if (window.confirm(`Are you sure you want to add these services?`)) {
            try {
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  };
                console.log(clientData)
                const client = JSON.stringify(clientData)
                const result = await axios.post(`http://localhost:1337/api/services`, client, config);
                console.log(result)
            } catch (error) {
            console.error(error);
            alert('There was an error adding notes.');
            }
            window.location.reload(false);
        }
    };

    return(
        <Container className='content'>
                    <div className="d-flex justify-content-center mb-2">
                        <div className='profileButton'><Button className='themeButton' variant='primary' onClick={addService} >add service</Button></div>
                        <div className='profileButton'><Button className='themeButton' variant='success' onClick={save} >Save</Button></div>
                    </div>
        </Container>
    )}

export default ServicesPage