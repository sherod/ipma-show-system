import React from "react";
import { useSelector } from "react-redux";

import { Container, Row, Spinner, Col, Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EntryList from "./EntryList";
import EntriesCard from "./EntriesCard";
import FeesCard from "./FeesCard";

import EntrantCard from "./EntrantCard";

function Saving(props) {
  if (props.show) {
    return (
      <div>
        <h2>
          <Spinner animation="border" /> Saving...
        </h2>
      </div>
    );
  }
  return <></>;
}

function Home(props) {
  const saving = useSelector((state) => state.entries.saving);

  return (
    <div className="App">
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        </Breadcrumb>
        <Saving show={saving} />
        <Row>
          <Col>
            <EntrantCard callback={props.callback} />
          </Col>
          <Col lg={true}>
            <EntriesCard />
          </Col>
          <Col lg={true}>
            <FeesCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <EntryList />
          </Col>
        </Row>
        <p>
          <br />
          <LinkContainer to="/help">
            <a>Any questions? Visit the Help Page</a>
          </LinkContainer>
        </p>
      </Container>
    </div>
  );
}

export default Home;
