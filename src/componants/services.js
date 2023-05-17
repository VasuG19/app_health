import {React} from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

/**
 * Services Page 
 * 
 * function to return services data with relevant information
 * 
 * @author Mehtab Gill
 */

function ServicesPage(props){
    
    const [services, setServices] = useState({title:'', desc:''})
    const [data, setData] = useState([])


    useEffect(() => {
        // retrieve the user data from the api
        const getServices = async () => {
          const response = await axios.get(`http://localhost:1337/api/services?populate=*&filters[client][id][$eq]=${props.clientData.id}`);
          setData(response.data.data);
        };
        getServices();
    }, [props.clientData.id, data]);

    // handle submitting updated data
    const addService = async () => {
        const title = prompt('Add title');
        console.log(title);
        const description = prompt('Add description');
        console.log(description);
        if (title) {
            setServices({
            data: {
                title: title,
                desc: description,
                client: props.clientData.id
            },
            });
        }
    }

    // handle saving the added service to the database 
    const save = async () => {
        if (window.confirm(`Are you sure you want to add these services?`)) {
            try {
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  };
                console.log(services)
                const service = JSON.stringify(services)
                const serv = await axios.post(`http://localhost:1337/api/services`, service, config);
                console.log(serv)
            } catch (error) {
            console.error(error);
            alert('There was an error adding notes.');
            }
            window.location.reload(false);
        }
    };

    // handle for when an event is clicked, the user has the option to delete the booking
    const del = async (id) => {
        if (window.confirm(`Are you sure you want to delete this service?`)) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                await axios.delete(`http://localhost:1337/api/services/${id}`, config);
                alert('Service deleted successfully!');
                window.location.reload(false);
            } catch (error) {
                console.error(error);
                alert('There was an error deleting the service.');
            }
        }
    };

    // map all services from the array to render to the componant
    const serviceAdmin = data && data.map((value) => (
        <div  key={value.id} className="col-lg-4 mb-5">
            <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                <h4 className="card-title mb-3">{value.attributes.title}</h4>
                    <p className="card-text mb-0">{value.attributes.desc}</p>
                </div>
                <div className="card-footer p-4">
                    <div className='profileButton'>
                        <Button className='themeButton' variant='danger' onClick={() => del(value.id)}>delete</Button>
                    </div>
                </div>
            </div>
        </div>
    ));
    

    // return all services
    return(
        <Container>
                <div>
                    <Row sm={true}>
                        {serviceAdmin}
                    </Row>
                    <div className="d-flex justify-content-center mb-2">
                        <div className='profileButton'><Button className='themeButton' variant='primary' onClick={addService} >add service</Button></div>
                        <div className='profileButton'><Button className='themeButton' variant='success' onClick={save} >Save</Button></div>
                    </div>
                </div>
        </Container>
    )}

export default ServicesPage