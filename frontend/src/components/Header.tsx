import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const { email } = useAppSelector((state) => state.user);
  const logoutHandler = () => {};

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container className="d-flex">
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="mb-2 fas fa-home"> Home</i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {email ? (
              <div>
                <NavDropdown
                  className="navbar-nav text-capitalize"
                  title={email}
                  id="username"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
