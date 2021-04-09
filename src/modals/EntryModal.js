import React, { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createEntry, updateEntry } from "../features/entries/entriesSlice";
import { validCategoryList } from "../helpers/CategoryName";

function EntryModal(props) {
  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = React.useState([]);

  useEffect(() => {
    setCategoryList(validCategoryList(props.entrant.age));
  }, [categoryList, props]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "*Names must have at least 2 characters")
      .max(60, "*Names can't be longer than 60 characters")
      .required("*Name is required"),
    scale: Yup.string()
      .min(2, "*Scale must have at least 3 characters")
      .max(6, "*Scale can't be longer than 6 characters")
      .required("*Scale is required")
      .matches(/^\d\/\d+$/gm, "Scale must be in the right format, eg. 1/48"),
    manufacturer: Yup.string()
      .min(2, "*Manufacturer must have at least 3 characters")
      .max(25, "*Manufacturer can't be longer than 25 characters")
      .required("*Manufacturer is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleNewItem = async (newRegistration) => {
    let newE = {
      id: newRegistration.id,
      name: newRegistration.name,
      scale: newRegistration.scale,
      category: newRegistration.category,
      manufacturer: newRegistration.manufacturer,
      entrantID: props.entrant.id,
    };

    if (newRegistration.id === undefined) {
      dispatch(createEntry(newE));
      props.successCallback();
    } else {
      dispatch(updateEntry(newE));
      props.successCallback();
    }
  };

  return (
    <Modal show={props.show} onHide={props.cancelCallback} centered>
      <Formik
        initialValues={{
          name: props.entry.name,
          scale: props.entry.scale,
          category: props.entry.category,
          manufacturer: props.entry.manufacturer,
          id: props.entry.id,
          version: props.entry._version,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleNewItem(values);
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
            <Modal.Header closeButton>
              <Modal.Title>Your New Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formName">
                <Form.Control type="hidden" name="id" value={values.id} />
                <Form.Control
                  type="hidden"
                  name="version"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values._version}
                />
                <Form.Label>Entry Name </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g. Sherman Late War (up to 60 characters)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.name}
                  className={touched.name && errors.name ? "has-error" : null}
                />
                {touched.name && errors.name ? (
                  <div className="error-message">{errors.name}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formScale">
                <Form.Label>Scale (Use 1/1 Scale for EGG models)</Form.Label>
                <Form.Control
                  type="text"
                  name="scale"
                  placeholder="e.g. 1/48"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.scale}
                  className={touched.scale && errors.scale ? "has-error" : null}
                />
                {touched.scale && errors.scale ? (
                  <div className="error-message">{errors.scale}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formManufactuer">
                <Form.Label>Manufacturer :</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  placeholder="e.g. Tamiya (up to 25 characters)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.manufacturer}
                  className={
                    touched.manufacturer && errors.manufacturer
                      ? "has-error"
                      : null
                  }
                />
                {touched.manufacturer && errors.manufacturer ? (
                  <div className="error-message">{errors.manufacturer}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category :</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  placeholder="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.category}
                  className={
                    touched.category && errors.category ? "has-error" : null
                  }
                >
                  {categoryList.map((category, index) => {
                    return (
                      <option value={category.code}>{category.name}</option>
                    );
                  })}
                </Form.Control>
                {touched.category && errors.category ? (
                  <div className="error-message">{errors.category}</div>
                ) : null}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.cancelCallback}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save Entry
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EntryModal;
