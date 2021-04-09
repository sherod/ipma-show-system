import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrantSuccess,
  fetchEntries,
} from "../features/entries/entriesSlice";
import { useHistory } from "react-router-dom";
import CheckedInBadge from "../home/CheckedIn";

function EntrantsList(props) {
  let history = useHistory();

  const dispatch = useDispatch();

  const entrants = useSelector((state) => state.admin.entrants);

  const becomeEntrant = (entrant) => {
    dispatch(getEntrantSuccess(entrant));
    dispatch(fetchEntries(entrant.id));
    history.push("/");
  };

  return (
    <Container>
      <h3>We have {entrants.length} entrants</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Entrant #</th>
            <th>Name</th>

            <th>Contact Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entrants.map((entrant, index) => (
            <tr key={entrant.id}>
              <td>{entrant.entrantNumber}</td>
              <td>
                {entrant.firstname} {entrant.lastname}{" "}
                <CheckedInBadge checkedIn={entrant.checkedIn} />{" "}
              </td>
              <td>{entrant.contactPhone} </td>
              <td>
                {" "}
                <Button onClick={() => becomeEntrant(entrant)}>
                  Manage Entrant
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EntrantsList;
