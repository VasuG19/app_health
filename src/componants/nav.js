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

function NavBar(){
const handleClick = event => {};

  return(
    
          <Navbar style={{padding:' 10px'}} bg="dark" variant='dark' expand="lg" fixed="top">
              <Navbar.Brand>Health+</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer onClick={handleClick} to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                </Nav>
              </Navbar.Collapse>
        </Navbar>
  )
}
export default NavBar