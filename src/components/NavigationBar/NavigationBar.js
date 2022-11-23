import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavigationBar.css'

function NavigationBar({isAdmin, setIsAdmin, showLogin, setShowLogin, apiUrl}) {
    function handleClick() {
        setShowLogin(true);
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Iron House</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className='nav-link' to="/">Home</Link>
              <Link className='nav-link' to="/Contato">Contato</Link>
              {isAdmin && <Link className='nav-link' to='/register'>Cadastrar imóvel</Link>}
            </Nav>
            {!isAdmin && <Button onClick={handleClick} as="input" type="button" value="Logar" />}
            {isAdmin && <Button onClick={() => setIsAdmin(false)} as="input" type="button" value="Sair" />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
};

export default NavigationBar;
