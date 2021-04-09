import { useDispatch } from "react-redux";
import React, { useEffect, useRef } from "react";
import {
  Container,
  Button,
  Navbar,
  Tab,
  Tabs,
  Breadcrumb,
} from "react-bootstrap";
import { fetchEntries, fetchEntrants } from "../features/admin/adminSlice";
import PrintAll from "./PrintAll";
import EntryList from "./EntryList";
import ReactToPrint from "react-to-print";
import EntrantsList from "./EntrantsList";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import EntrantModal from "../modals/EntrantModal";

function Admin() {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = React.useState(false);
  const entrants = useSelector((state) => state.admin.entrants);

  useEffect(() => {
    dispatch(fetchEntrants());
    dispatch(fetchEntries());
  }, [dispatch]);

  const componentRef = useRef();

  const showEditModal = () => {
    setShowEdit(true);
  };

  const hideEditModal = () => {
    dispatch(fetchEntrants());
    dispatch(fetchEntries());
    setShowEdit(false);
  };

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

  return (
    <Container>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Admin</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="All Entrants">
          <Container>
            <Navbar className="justify-content-end">
              <Button onClick={showEditModal}>Add Entrant</Button> &nbsp;
            </Navbar>
          </Container>
          <EntrantsList />
        </Tab>
        <Tab eventKey="profile" title="All Entries">
          <Container>
            <Navbar className="justify-content-end">
              <Button onClick={showEditModal}>Add Entrant</Button> &nbsp;{" "}
              <ReactToPrint
                copyStyles={false}
                pageStyle={printingStyles}
                trigger={() => <Button>Print All Entries</Button>}
                content={() => componentRef.current}
              />
            </Navbar>

            <EntryList />
            <div style={printOnly}>
              <PrintAll ref={componentRef} entrants={entrants} />
            </div>
          </Container>
        </Tab>
      </Tabs>
      <EntrantModal
        show={showEdit}
        hideEditCallback={hideEditModal}
        offline={true}
      />
    </Container>
  );
}

export default Admin;
