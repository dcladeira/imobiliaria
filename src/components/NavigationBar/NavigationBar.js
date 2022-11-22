import { Button, Container, Nav, Navbar } from "react-bootstrap";
import AddProperties from "../Properties/AddProperties";
import { Link } from "react-router-dom";

function NavigationBar({isAdmin, showLogin, setShowLogin, apiUrl}) {
    function handleClick() {
        setShowLogin(true);
        console.log(showLogin);
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Iron Imobiliária</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className='nav-link' to="/">Home</Link>
              <Link className='nav-link' to="/Contato">Contato</Link>
              {/* {isAdmin && <Link className='nav-link' to='/add-properties'>Adicionar imóvel</Link>} */}
              {isAdmin && <AddProperties apiUrl={apiUrl} />}
            </Nav>
            <Button onClick={handleClick} as="input" type="button" value="Logar" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
};

export default NavigationBar;
