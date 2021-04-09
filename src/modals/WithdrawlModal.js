import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { withdrawEntry } from '../features/entries/entriesSlice'

function WithdrawlModal(props) {

  const dispatch = useDispatch();

  const doAction = () => {
    dispatch(withdrawEntry(props.entry));
    props.cancelCallback()
  }
   
 
 
 
    return (
      <Modal show={props.show} onHide={() => props.cancelCallback()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to withdraw this entry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.cancelCallback()}>
            No
          </Button>
          <Button variant="primary" onClick={() => doAction()}>
            Yes
          </Button>
        </Modal.Footer>

      </Modal>
    );
 
}

export default WithdrawlModal;