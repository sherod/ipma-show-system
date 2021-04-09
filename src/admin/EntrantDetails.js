export function ViewHeader(props) {
  return (
    <b>
      {props.firstname} {props.lastname} ({props.contactnumber}) -{" "}
      {props.entrycount} entries
    </b>
  );
}

export function PrintHeader(props) {
  return (
    <div className="printbox">
      <div className="textbox">
        <h2>
          {" "}
          {props.firstname} {props.lastname}{" "}
        </h2>
        <h3>{props.entrycount} entries</h3>
      </div>
    </div>
  );
}
