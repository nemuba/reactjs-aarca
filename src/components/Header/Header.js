import React from "react";
import { Navbar, Nav} from "react-bootstrap";
import { FaAcquisitionsIncorporated } from "react-icons/fa";
import {isAuthenticated} from './../../services/auth';

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
      <Nav>
        {props.user ? <Nav.Link href="/user_details">{props.user}</Nav.Link> :""}
        { isAuthenticated() ? <Nav.Link href="/logout">Logout</Nav.Link> : ""}
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;