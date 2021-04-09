import { Container, Navbar, Badge, Nav } from "react-bootstrap";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { LinkContainer } from "react-router-bootstrap";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/entries/entriesSlice";

function Navigation(props) {
  const dispatch = useDispatch();
  const entrant = useSelector((state) => state.entries.entrant);
  const loggedOut = useSelector((state) => state.entries.loggedOut);
  const isAdmin = useSelector((state) => state.entries.isAdmin);

  function AdminMenu() {
    if (isAdmin) {
      return (
        <LinkContainer to="/mng">
          <Nav.Link>Admin</Nav.Link>
        </LinkContainer>
      );
    } else {
      return <></>;
    }
  }

  function Impersonating() {
    if (isAdmin) {
      return (
        <h2 style={{ paddingLeft: "10px" }}>
          <Badge variant="warning">
            Entrant is {entrant.firstname} {entrant.lastname}
          </Badge>
        </h2>
      );
    } else {
      return <></>;
    }
  }

  function HelpMenu() {
    return (
      <LinkContainer to="/help">
        <Nav.Link>Help</Nav.Link>
      </LinkContainer>
    );
  }

  function signOut(nextAuthState) {
    if (nextAuthState === "signedout") {
      dispatch(logout());
    }
  }

  function LoggedIn() {
    if (!loggedOut) {
      return (
        <>
          {" "}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <HelpMenu />
            <AdminMenu /> <AmplifySignOut handleAuthStateChange={signOut} />
          </Navbar.Collapse>
          <Navbar.Text>
            <Impersonating />
          </Navbar.Text>{" "}
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Container>
      <Navbar bg="light" expand="xl">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src="./ipma64.ico"
              width="50"
              height="50"
              className="d-inline-block align-middle"
            />{" "}
            Online Entry
          </Navbar.Brand>
        </LinkContainer>{" "}
        <LoggedIn />
      </Navbar>
    </Container>
  );
}

export default Navigation;
