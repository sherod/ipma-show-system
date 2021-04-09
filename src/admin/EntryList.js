import React from "react";

import CategoryName from "../helpers/CategoryName";
import { Table, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CheckedInBadge from "../home/CheckedIn";

import {
  getEntrantSuccess,
  fetchEntries,
} from "../features/entries/entriesSlice";
import { useHistory } from "react-router-dom";

function EntryList(prop) {
  let history = useHistory();
  const entrants = useSelector((state) => state.admin.entrants);
  const dispatch = useDispatch();

  const becomeEntrant = (entrant) => {
    dispatch(getEntrantSuccess(entrant));
    dispatch(fetchEntries(entrant.id));
    history.push("/");
  };

  return (
    <Container>
      <h3>All entrants and entries</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Entry #</th>
            <th>Name</th>
            <th>Scale</th>
            <th>Manufacturer</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {entrants.map((entrant, index) => (
            <>
              <tr key={entrant.id}>
                <th colSpan="4">
                  {entrant.firstname} {entrant.lastname} {entrant.contactPhone}{" "}
                  <CheckedInBadge checkedIn={entrant.checkedIn} />
                </th>
                <th>
                  {" "}
                  <Button onClick={() => becomeEntrant(entrant)}>
                    Manage Entrant
                  </Button>
                </th>
              </tr>
              {entrant.entries.items.map((entry, index2) => (
                <tr key={entry.id}>
                  <td>{entry.entryNumber}</td>
                  <td>{entry.name}</td>
                  <td>{entry.scale}</td>
                  <td>{entry.manufacturer}</td>
                  <td>
                    <CategoryName categoryNumber={entry.category} />
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EntryList;
