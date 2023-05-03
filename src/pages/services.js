import {React} from 'react';
import { Container, Row } from 'react-bootstrap';
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
    
    const [services, setServices] = useState({title:'', desc:''})
const [isAdmin, setIsAdmin]  = useState(false);


    useEffect(() => {
        if (!user ||user.title!== 'client') {
           setIsAdmin(false)
          } else {
            setIsAdmin(true)
          }
    },[user]);

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
                desc: description
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

    // return all of the services into a grid for the services page
    const service = props.services && props.services.map((value) => (
        <div  key={value.id} className="col-lg-4 mb-5">
            <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                <h4 className="card-title mb-3">{value.attributes.title}</h4>
                    <p className="card-text mb-0">{value.attributes.desc}</p>
                </div>
            </div>
        </div>
    )
)

    return(
        <Container className='content'>
                <div className="d-flex justify-content-center mb-2">
                    <div className='profileButton'><button className='themeButton' onClick={save} >Save</button></div>
                    <div className='profileButton'><button className='themeButton' onClick={addService} >add service</button></div>
                </div>
            <Row sm={true}>
                {service}
            </Row>
        </Container>
    )}

export default ServicesPage