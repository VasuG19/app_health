import {React} from 'react';
import { Container, Row } from 'react-bootstrap';

/**
 * Services Page 
 * 
 * function to return services data with relevant information
 * 
 * @author Mehtab Gill
 */

function ServicesPage(props){

    // return all of the services into a grid for the services page
    const service = props.services && props.services.map((value) => (
        <div  key={value.id} className="col-lg-4 mb-5">
            <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">Health+</div>
                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">{value.attributes.title}</h5></a>
                    <p className="card-text mb-0">{value.attributes.desc}</p>
                </div>
            </div>
        </div>
    )
)

    return(
        <Container className='content'>
            <Row sm={true}>
                {service}
            </Row>
        </Container>
    )}

export default ServicesPage