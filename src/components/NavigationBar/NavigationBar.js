import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddProperties from "../Properties/AddProperties";

function NavigationBar({apiURL, body, setBody}) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Iron Imóveis</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Link className="nav-link" to={"/cadastrar"}>Cadastrar</Link> */}
          <AddProperties apiURL={apiURL} body={body} setBody={setBody} />
          <Link className="nav-link" to={"/"}>Voltar</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
