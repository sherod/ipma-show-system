

import React from "react";
import { Card, Spinner } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { useSelector } from 'react-redux'

function FeesCard(props) {



  const cost = useSelector((state) => state.entries.cost);
  const entryCount = useSelector((state) => state.entries.entryCount);
  const awaitingEntrant = useSelector((state) => state.entries.awaitingEntrant);

  if (awaitingEntrant) {
    return <Spinner animation="border" variant="dark" />
  } else {

    return (
      <Card>
        <Card.Header>
          <h1>Entry Fees</h1>
        </Card.Header>
        <Card.Body>
          <p>The amount payable <b>on the day</b> is </p>
          <h2>
            {" "}
            <CurrencyFormat
              value={cost}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType={"text"}
              prefix={"$"}
              renderText={(value) => <span>{value}</span>}
            /> for {entryCount} entries
          </h2>
        </Card.Body>
      </Card>)
  }
}


export default FeesCard;