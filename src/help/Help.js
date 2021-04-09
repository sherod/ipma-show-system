import React from "react";
import { Container, Row, Col, Form, Breadcrumb, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function Help(props) {
  const entrant = useSelector((state) => state.entries.entrant);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const returnPath = window.location.href + "/submitted";

  console.log(props);

  React.useEffect(() => {
    if (props.location.pathname.endsWith("/submitted")) {
      setShowConfirmation(true);
    }
  }, [props.location.pathname]);

  return (
    <Container>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Help</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <h2>FAQ</h2>
          <p>
            <b>
              I need to know more about the competition (Where/When/What
              Categories)?
            </b>
            <br />
            Visit the show's website at{" "}
            <a href="https://ipmamodels.net/nsw-scale-model-show/">
              https://ipmamodels.net/nsw-scale-model-show/
            </a>
          </p>
          <p>
            <b>When/how do I need to pay?</b>
            <br />
            Pay, in cash, on the day of the show when you check in. We
            considered online payments, but the complexity of refunding and so
            forth means its easier just to sort it out on the day.
          </p>
          <p>
            <b>Can I change my entries later?</b>
            <br />
            You can login and maintain your entries and descriptions up until
            the moment you register. We will be pre-printing the entry cards the
            day before the show, so it would be helpful if you be up to date by
            then <u>otherwise you may encounter delays when checking in.</u>
          </p>
          <p>
            <b>Something isn't working on this site?</b>
            <br />
            Please use the form on this page with your correct details and we'll
            try and help.
          </p>
          <p>
            <b>How do I print my entry cards/etc?</b>
            <br />
            No need to print anything, just provide your name and phone number
            when checking in on the day.
          </p>
          <p>
            <b>What will an entry card look like?</b>
            <br />
            Entry cards will be printed on a piece of A5 paper (half the size of
            A4 or normal printed page) and look like the image below:
            <img src="/entryCard.png" alt="An Entry Card Example" />
          </p>
          <b>I have other questions?</b>
          <br />
          Join our facebook group and ask:{" "}
          <a href="https://www.facebook.com/groups/Illawarraplasticmodellersassociation">
            https://www.facebook.com/groups/Illawarraplasticmodellersassociation
          </a>
        </Col>
        <Col>
          <h2>Contact us</h2>

          <Alert variant="success" show={showConfirmation}>
            Thank you, your case has been submitted, you should get an email
            confirming this.
          </Alert>
          <Form
            action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8"
            method="POST"
          >
            <input type="hidden" name="orgid" value="00D5g000004S418" />
            <input type="hidden" name="retURL" value={returnPath} />

            <Form.Group controlId="name">
              <Form.Label>Contact Name </Form.Label>
              <Form.Control
                maxLength="80"
                name="name"
                size="20"
                type="text"
                value={entrant.firstname + " " + entrant.lastname}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                maxLength="80"
                name="email"
                size="20"
                type="text"
                value={entrant.emailAddress}
              />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                maxLength="80"
                name="subject"
                size="20"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows="6"
              ></Form.Control>
            </Form.Group>
            <br />
            <input type="hidden" id="external" name="external" value="1" />
            <br />
            <input type="submit" name="submit" />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Help;
