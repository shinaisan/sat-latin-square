import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Form, FormGroup,
  Row, Col,
  Button
} from 'react-bootstrap';

const validate = values => {
  const errors = {}
  const maxSize = 6;
  const minSize = 2;
  const str = values.size;
  if (typeof(str) === 'undefined') {
    errors.size = 'Required';
  } else if ((typeof(str) !== 'undefined') && (str.length > 0)) {
    const errorMessage = 'Please enter a digit from ' +
      minSize.toString() + ' to ' + maxSize.toString();
    if (/^\d+$/.test(str)) {
      const size = Number(str);
      if ((size > maxSize) || (size < minSize)) {
        errors.size = errorMessage;
      }
    } else {
      errors.size = errorMessage;
    }
  }
  return errors
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <FormGroup>
    <Row>
      <Col sm={2}>
        <label>{label}</label>
      </Col>
      <Col sm={8}>
        <input {...input} type={type} placeholder={label} size="40" />
        {touched && error && <span>{error}</span>}
      </Col>
    </Row>
  </FormGroup>
);

let OptionsForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="size"
        type="text"
        component={renderField}
        label="Size"
      />
      <div>
        <Button type="submit" bsStyle="primary"
          disabled={submitting}>
          Solve
        </Button>
        <Button type="button" bsStyle="default"
          disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  );
};


OptionsForm = reduxForm({
  form: 'optionsForm',
  validate
})(OptionsForm);

OptionsForm = connect(
  state => ({
    initialValues: state.options
  })
)(OptionsForm);

export default OptionsForm;

