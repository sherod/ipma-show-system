import React, { useRef } from "react";
import { useSelector } from "react-redux";

import Moment from "react-moment";
import { Table, Button, Spinner } from "react-bootstrap";
import CategoryName from "../helpers/CategoryName";
import EntryModal from "../modals/EntryModal";
import WithdrawlModal from "../modals/WithdrawlModal";
import PrintEntries from "../admin/PrintEntries";
import ReactToPrint from "react-to-print";

const printingStyles = `
@media print {
    @page {
      /* dimensions for the whole page */
      size: A5 landscape;    
      margin: 1cm;

  }
 
 
      .printOnly {
          display : block;
      }
 
      .entryNumberTitle {
        font-size:8pt;
      }
  .entryNumber {
    position:absolute;
    border: 1px solid;
    font-size: 34pt;
    text-align: center;
    padding: 5px;
    right: 10px;
    top  : 10px;
  }
  
  .printbox {
    width: 100%;
    height:100%;
    top:0px;
    bottom:0px;
    margin: auto;
    margin-top: 0px !important;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    page-break-after: always;
    position: relative;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  }
  .textbox {
    text-align: center;
  }

  .category {
    position:absolute;
    bottom: 0px;
    right:10px;
    font-size: 16pt;
}

.entryName {
  font-size: 42pt
}

.scale {
  font-size: 24pt
}

.banner {
  position:absolute;
  top: 10px;
  left:10px;
  font-size: 16pt;
  display: flex;
  align-items:center;
}

}
  `;

const printOnly = {
  display: "none",
};

function EntryList(props) {
  const componentRef = useRef();

  const [showEntrantModal, setShowEntrantModal] = React.useState(false);
  const [showWithdrawlModal, setShowWithdrawlModal] = React.useState(false);
  const [currentEntry, setCurrentEntry] = React.useState([]);

  const entrant = useSelector((state) => state.entries.entrant);
  const entries = useSelector((state) => state.entries.entries);
  const isAdmin = useSelector((state) => state.entries.isAdmin);

  const handleCloseEntrantForm = () => {
    setShowWithdrawlModal(false);
    setShowEntrantModal(false);
    setCurrentEntry({});
  };

  const editEntry = (item) => {
    setShowEntrantModal(true);
    setCurrentEntry(item);
  };

  const withdrawEntry = (item) => {
    setShowWithdrawlModal(true);
    setCurrentEntry(item);
  };

  function NoEntriesText(props) {
    if (props.count === 0) {
      return " No entries yet";
    } else {
      return " ";
    }
  }

  function PrintEntriesButton(props) {
    if (isAdmin) {
      return (
        <>
          {" "}
          <ReactToPrint
            copyStyles={false}
            pageStyle={printingStyles}
            trigger={() => <Button>Print All Entries</Button>}
            content={() => componentRef.current}
          />
          <div style={printOnly}>
            <PrintEntries entries={entries} ref={componentRef} />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }

  if (!entrant) {
    return <Spinner animation="border" variant="dark" />;
  } else {
    return (
      <>
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>Entry #</th>
              <th>Entry Name</th>
              <th>Scale</th>
              <th width="30%">Category</th>
              <th>Manufacturer</th>
              <th>Entry Time</th>
              <th width="20%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item, index) => (
              <tr key={item.id}>
                <td>{item.entryNumber}</td>
                <td>{item.name}</td>
                <td>{item.scale}</td>
                <td>
                  <CategoryName categoryNumber={item.category} />
                </td>
                <td>{item.manufacturer}</td>
                <td>
                  <Moment fromNow>{item.updatedAt}</Moment>
                </td>
                <td>
                  <Button onClick={() => editEntry(item)}>Edit</Button>{" "}
                  <Button onClick={() => withdrawEntry(item)}>Withdraw</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <NoEntriesText count={entries.length} />
        <PrintEntriesButton />
        <EntryModal
          successCallback={handleCloseEntrantForm}
          cancelCallback={handleCloseEntrantForm}
          show={showEntrantModal}
          entrant={entrant}
          entry={currentEntry}
        />
        <WithdrawlModal
          successCallback={handleCloseEntrantForm}
          cancelCallback={handleCloseEntrantForm}
          show={showWithdrawlModal}
          entry={currentEntry}
        />
      </>
    );
  }
}

export default EntryList;
