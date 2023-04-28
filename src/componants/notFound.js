import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

/**
 * notfound componant
 * 
 * componant to called when an invalid endpoint in entered
 * 
 * @author Mehtab Gill
 */

export default function NotFound() {
    return (
        <Container className='content'>
            <h1>Oops! You seem to be lost.</h1>
            <Link to='/'>Home</Link>
        </Container>
    )
}