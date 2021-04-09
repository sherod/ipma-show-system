import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "./navigation/Navigation";
import Cookies from "universal-cookie";
import React from "react";

function UnauthenticatedHome(props) {
  const [nextAuthState, setNextAuthState] = React.useState("signup");

  React.useEffect(() => {
    let cookies = new Cookies();
    if (cookies.get("nextAuthState") !== undefined) {
      setNextAuthState(cookies.get("nextAuthState"));
    }
  }, []);

  return (
    <Container fluid="md">
      <Navigation />
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h1>Create your online account</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>What to do now</h3>
          <p>
            Welcome to the online registration system for the NSW Scale Model
            Show
          </p>
          This system will allow you to:
          <ol>
            <li>
              Register with your <b>email address</b> and password
            </li>
            <li>Enter and withdraw kits up until the day of the show</li>
            <li>Show you the entry fee's payable (in cash) on the day</li>
          </ol>
          <p>
            <b>You registered, but you haven't got your verification code?</b>
            <br />
            It has been emailed for you and should arrive within a minute, check
            your spam or junk folder in your email.
          </p>
          <p>
            <b>Don't have an email address?</b>
            <br />
            Get one for free from{" "}
            <a href="https://www.microsoft.com/en-au/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook">
              Microsoft
            </a>{" "}
            or <a href="https://www.google.com/gmail/about/">Google</a>
          </p>
        </Col>
        <Col>
          <AmplifyAuthenticator
            usernameAlias="email"
            initialAuthState={nextAuthState}
          >
            <AmplifySignIn
              headerText="Sign in with your email address"
              slot="sign-in"
              usernameAlias="email"
            ></AmplifySignIn>
            <AmplifySignUp
              slot="sign-up"
              usernameAlias="email"
              formFields={[
                {
                  type: "email",
                  label: "Your Email Address",
                  placeholder: "e.g. name@example.org",
                  required: true,
                },
                {
                  type: "password",
                  label: "Your Password (8 Characters or more)",
                  placeholder: "**********",
                  required: true,
                },
              ]}
            />
          </AmplifyAuthenticator>
        </Col>
      </Row>
    </Container>
  );
}

export default UnauthenticatedHome;
