import React from "react";
import PrintEntries from "../admin/PrintEntries";

import { PrintHeader } from "./EntrantDetails";

class PrintAll extends React.Component {
  render() {
    return (
      <div>
        {this.props.entrants.map((item, index) => (
          <div key={item.id}>
            <PrintHeader
              lastname={item.lastname}
              firstname={item.firstname}
              contactnumber={item.contactNumber}
              entrycount={item.entries.items.length}
            />

            <PrintEntries entries={item.entries.items} />
          </div>
        ))}
      </div>
    );
  }
}

export default PrintAll;
