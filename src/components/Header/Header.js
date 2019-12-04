import React from "react";
import { Navbar, Nav} from "react-bootstrap";
import { FaAcquisitionsIncorporated } from "react-icons/fa";

const Header = (props) => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <FaAcquisitionsIncorporated />
        Arca
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/races" >
            Corridas
          </Nav.Link>
          <Nav.Link href="/type_tests" >
            Tipos de Prova
          </Nav.Link>
          <Nav.Link href="/tests" >
            Provas
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;