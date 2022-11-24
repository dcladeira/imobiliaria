import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import './NavigationBar.css'
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";

function NavigationBar({isAdmin, setIsAdmin, showLogin, setShowLogin, apiUrl}) {
  const location = useLocation();
  const navigate = useNavigate();

  
  function handleClick() {
        setShowLogin(true);
    }

    function handleLogOut() {
      setIsAdmin(false);
      navigate("/");
    }
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Iron House</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className='nav-link' to="/">Home</Link>
              {location.pathname === '/' && <HashLink className='nav-link' to='#contact'>Contato</HashLink>}
              {isAdmin && <Link className='nav-link' to='/register'>Cadastrar imóvel</Link>}
            </Nav>
            {!isAdmin && <Button onClick={handleClick} as="input" type="button" value="Logar" />}
            {isAdmin && <Button onClick={handleLogOut} as="input" type="button" value="Sair" />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
};

export default NavigationBar;
