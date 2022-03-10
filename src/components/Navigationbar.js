import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

const Navigationbar = () => {

  const history = useHistory();

  const token = localStorage.getItem('isAuthenticated');
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/Samples" className="navtags">
            <h4>Laboratory</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {token &&
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <NavLink to="/Samples" className="navtags">{role === "admin" ? "Samples" : "Dashboard"}</NavLink>
                {/* <NavLink to="/EnterSample" className="navtags">{role === "admin" ? "EnterSample" : ""}</NavLink> */}
              </Nav>}

            <Nav className="d-flex">
              <NavLink to="/RegistrationPage" className="navtags">{role === "admin" && "Register"}</NavLink>
              {!token && <NavLink to="/" className="navtags">Login</NavLink>}
            </Nav>
            {token && <Button onClick={() => { localStorage.clear(); history.push("/") }}>Logout</Button>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
