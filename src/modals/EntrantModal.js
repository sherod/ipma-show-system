import { Form, Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  updateEntrant,
  createEntrant,
  createOfflineEntrant,
} from "../features/entries/entriesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function EntrantModal(props) {
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.entries.isAdmin);
  const hasEntrant = useSelector((state) => state.entries.hasEntrant);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, "*Firstname must have at least 1 character")
      .max(100, "*Firstname can't be longer than 100 characters")
      .required("*Firstname is required"),
    lastname: Yup.string()
      .min(2, "*Lastname must have at least 3 characters")
      .max(100, "*Lastname can't be longer than 100 characters")
      .required("*Lastname is required"),
    contactPhone: Yup.string()
      .length(10, "*Phone Number must be 10 digits (include area code)")
      .required("Phone Number is required"),
    age: Yup.number()
      .nullable(true)
      .moreThan(2, "*You must be older than 2")
      .lessThan(
        17,
        "*You must be younger than 17 to be a junor, adults do not require an age"
      ),
    memberOfClub: Yup.string()
      .min(1, "*memberOfClub must have at least 1 character")
      .max(100, "*memberOfClub can't be longer than 100 characters"),
  });

  const handleNewEntrant = async (newEntrant) => {
    let newE = {
      firstname: newEntrant.firstname,
      lastname: newEntrant.lastname,
      memberOfClub: newEntrant.memberOfClub,
      contactPhone: newEntrant.contactPhone,
      age: parseInt(newEntrant.age),
    };

    if (newEntrant.id !== "") {
      newE.id = newEntrant.id;
    }

    console.log(props);
    if (newE.id !== undefined) {
      dispatch(updateEntrant(newE));
    } else {
      if (props.offline === true) {
        dispatch(createOfflineEntrant(newE));
      } else {
        dispatch(createEntrant(newE));
      }
    }

    props.hideEditCallback();
  };

  let initValues = {};

  if (props.entrant !== undefined) {
    initValues = {
      id: props.entrant.id,
      firstname: props.entrant.firstname,
      lastname: props.entrant.lastname,
      contactPhone: props.entrant.contactPhone,
      age: props.entrant.age,
      memberOfClub: props.entrant.memberOfClub,
    };
  }

  function CancelButton(props) {
    if (isAdmin || hasEntrant) {
      return (
        <Button variant="secondary" onClick={() => props.hideEditCallback()}>
          Cancel
        </Button>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Modal show={props.show} onHide={props.cancelCallback}>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleNewEntrant(values, props.hideEditCallback);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="mx-auto">
            <Modal.Header>
              <Modal.Title>We need to know a little about you</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="firstname">
                <Form.Control type="hidden" name="id" value={values.id} />
                <Form.Label>Firstname :</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="e.g. Bob"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  className={
                    touched.firstname && errors.firstname ? "has-error" : null
                  }
                />
                {touched.firstname && errors.firstname ? (
                  <div className="error-message">{errors.firstname}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="lastname">
                <Form.Label>Lastname :</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="e.g. Ross"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  className={
                    touched.lastname && errors.lastname ? "has-error" : null
                  }
                />
                {touched.lastname && errors.lastname ? (
                  <div className="error-message">{errors.lastname}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="contactPhone">
                <Form.Label>Phone Number :</Form.Label>
                <Form.Control
                  type="text"
                  name="contactPhone"
                  placeholder="e.g. 0437555504 (without spaces!)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactPhone}
                  className={
                    touched.contactPhone && errors.contactPhone
                      ? "has-error"
                      : null
                  }
                />
                {touched.contactPhone && errors.contactPhone ? (
                  <div className="error-message">{errors.contactPhone}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age (Junior Entry Only) :</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  placeholder="e.g. 15"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  className={touched.age && errors.age ? "has-error" : null}
                />
                {touched.age && errors.age ? (
                  <div className="error-message">{errors.age}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="memberOfClub">
                <Form.Label>
                  If a Member of club, which club are you a member of? :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="memberOfClub"
                  placeholder="e.g. IPMA"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.memberOfClub}
                  className={
                    touched.memberOfClub && errors.memberOfClub
                      ? "has-error"
                      : null
                  }
                />
                {touched.memberOfClub && errors.memberOfClub ? (
                  <div className="error-message">{errors.memberOfClub}</div>
                ) : null}
              </Form.Group>
              <Modal.Footer>
                <CancelButton
                  entrant={props.entrant}
                  hideEditCallback={props.hideEditCallback}
                />
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Save Details
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EntrantModal;
