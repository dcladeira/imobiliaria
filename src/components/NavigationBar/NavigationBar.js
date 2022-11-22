import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({isAdmin, showLogin, setShowLogin}) {
    function handleClick() {
        setShowLogin(true);
        console.log(showLogin);
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Iron Imobiliária</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='nav-link' href="#home">Home</Nav.Link>
              <Nav.Link className='nav-link' href="#contato">Contato</Nav.Link>
              {isAdmin && <Link className='nav-link' to='/add-propertie'>Adicionar imóvel</Link>}
            </Nav>
            <Button onClick={handleClick} as="input" type="button" value="Logar" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
};

export default NavigationBar;