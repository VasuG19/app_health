import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Navigation bar
 * 
 * return navbar with links to pages - displayed on all pages
 * 
 * @author Mehtab Gill
 */

function NavBar(props){

  return(
    <Navbar style={{padding:'10px'}} className='healthNav' bg='dark' variant='dark' expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Health+</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
           <LinkContainer to="/services"><Nav.Link>Services</Nav.Link></LinkContainer>
            {props.authenticated &&<LinkContainer to="/appointments"><Nav.Link>Appointments</Nav.Link></LinkContainer>}
            {props.authenticated && <LinkContainer to="/calendar"><Nav.Link>Calendar</Nav.Link></LinkContainer>}
          </Nav>
          <Nav className="ml-auto">
            {props.authenticated && <LinkContainer to="/profile"><Nav.Link>{props.user.username}</Nav.Link></LinkContainer> }
            {!props.authenticated && <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer> }
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
export default NavBar