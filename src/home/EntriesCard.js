import React from "react";
import { Card, Container, Button, Spinner } from "react-bootstrap";
import EntryModal from "../modals/EntryModal";
import { useSelector } from "react-redux";

function EntriesCard(props) {
  const [showEntrantForm, setShowEntrantForm] = React.useState(false);
  const awaitingEntrant = useSelector((state) => state.entries.awaitingEntrant);
  const entrant = useSelector((state) => state.entries.entrant);

  const openNewEntry = () => {
    setShowEntrantForm(true);
  };

  const handleCloseEntrantForm = () => {
    setShowEntrantForm(false);
  };

  const EntryForm = (props) => {
    if (awaitingEntrant) {
      return <Spinner animation="border" variant="dark" />;
    } else {
      if (props.layout === "compact") {
        return (
          <>
            <Button onClick={props.openNewEntry}>Add an Entry</Button>
          </>
        );
      } else {
        return (
          <>
            <Card>
              <Card.Header>
                <h1>Your Entries</h1>
              </Card.Header>
              <Card.Body>
                <Container>
                  <p>
                    You can add or modify your entries up until the 14th May
                    2021
                  </p>
                  <Button onClick={props.openNewEntry}>Add an Entry</Button>
                </Container>
              </Card.Body>
            </Card>
          </>
        );
      }
    }
  };

  return (
    <>
      <EntryForm layout={props.layout} openNewEntry={openNewEntry} />
      <EntryModal
        successCallback={handleCloseEntrantForm}
        cancelCallback={handleCloseEntrantForm}
        show={showEntrantForm}
        entrant={entrant}
        entry={{}}
      />{" "}
    </>
  );
}

export default EntriesCard;
