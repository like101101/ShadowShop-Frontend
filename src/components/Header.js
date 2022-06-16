import React from "react";
import "../bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            ShadowShop
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/cart">
            <Nav.Link>
              <i className="fas fa-shopping-cart"></i>Cart
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>
              <i className="fas fa-user"></i> Login
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
