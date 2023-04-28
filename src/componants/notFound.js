import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container className='content'>
            <h1>Oops! You seem to be lost.</h1>
            <Link to='/'>Home</Link>
        </Container>
    )
}