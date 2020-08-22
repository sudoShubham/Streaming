import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, lable, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{lable}</label>
        <input {...input} />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="Title" component={this.renderInput} lable="Enter Name" />
        <Field
          name="Description"
          component={this.renderInput}
          lable="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formvalues) => {
  const errors = {};
  if (!formvalues.Title) {
    errors.Title = "You must enter a title !";
  }
  if (!formvalues.Description) {
    errors.Description = "You must enter a description !";
  }

  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate: validate,
})(StreamForm);
