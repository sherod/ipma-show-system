import CategoryName from "../helpers/CategoryName";
import React from "react";

function Loop(props) {
  return props.entries.map((entry, index) => (
    <div key={entry.id}>
      <div className="printbox">
        <div className="banner">
          <img alt="IPMA" src="/ipma192.png" width="50" />
          &nbsp;&nbsp;NSW Scale Model Show
        </div>
        <div className="entryNumber">
          <div className="entryNumberTitle">Entry #</div>
          {entry.entryNumber}
        </div>
        <div className="textbox">
          <h1 className="entryName">{entry.name}</h1>
          <h2 className="scale">{entry.scale}</h2>
          <p>
            <i>{entry.manufacturer}</i>
          </p>

          <h2 className="category">
            <CategoryName categoryNumber={entry.category} />
          </h2>
        </div>
      </div>
    </div>
  ));
}

class PrintEntries extends React.Component {
  render() {
    return (
      <div>
        <Loop entries={this.props.entries} />
      </div>
    );
  }
}

export default PrintEntries;
