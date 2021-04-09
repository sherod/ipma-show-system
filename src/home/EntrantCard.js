import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import EntrantModal from "../modals/EntrantModal";
import { useSelector } from "react-redux";
import { checkInEntrant } from "../features/entries/entriesSlice";
import { useDispatch } from "react-redux";
import CheckedInBadge from "../home/CheckedIn";

function EntrantCard(props) {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = React.useState(false);

  const entrant = useSelector((state) => state.entries.entrant);
  const hasEntrant = useSelector((state) => state.entries.hasEntrant);
  const awaitingEntrant = useSelector((state) => state.entries.awaitingEntrant);
  const isAdmin = useSelector((state) => state.entries.isAdmin);

  const showEditModal = () => {
    setShowEdit(true);
  };

  const hideEditModal = () => {
    setShowEdit(false);
  };

  const checkedInEntrant = () => {
    dispatch(checkInEntrant(entrant));
  };

  function CheckInButton(props) {
    if (isAdmin) {
      return <Button onClick={props.onClick}>Check In</Button>;
    } else {
      return <></>;
    }
  }

  if (awaitingEntrant || !hasEntrant) {
    return (
      <Spinner animation="border" variant="dark">
        <EntrantModal
          show={!hasEntrant}
          hideEditCallback={hideEditModal}
          entrant={entrant}
        />
      </Spinner>
    );
  } else if (!awaitingEntrant) {
    return (
      <Card>
        <Card.Header>
          <h1>About you</h1>
        </Card.Header>
        <Card.Body>
          <p>
            {entrant.firstname} {entrant.lastname}{" "}
            <CheckedInBadge checkedIn={entrant.checkedIn} />
          </p>
          <Button onClick={showEditModal}>Edit Details</Button> &nbsp;
          <CheckInButton onClick={() => checkedInEntrant()}>
            Check In
          </CheckInButton>
        </Card.Body>

        <EntrantModal
          show={showEdit}
          hideEditCallback={hideEditModal}
          entrant={entrant}
        />
      </Card>
    );
  }
}

export default EntrantCard;
