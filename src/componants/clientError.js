import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

/**
 * clientError componant
 * 
 * componant to called when an a client tries to access the client page
 * 
 * @author Mehtab Gill
 */

export default function ClientError() {
    return (
        <Container className='content'>
            <h3>You must be logged in as a patient to book an appointment.</h3>
            <Link to='/'>Home</Link>
        </Container>
    )
}