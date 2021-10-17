import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label htmlFor="">{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        {field.meta.error}
      </div>
    )
  }

  render() {
    return (
      <form>
        <Field label="Title" name="title" component={this.renderField}></Field>
        <Field
          label="Tags"
          name="categories"
          component={this.renderField}
        ></Field>
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        ></Field>
      </form>
    )
  }
}

function validate(values) {
  console.log(values)
  const errors = {}

  // Validate the inputs from 'values'
  // if (values.title.length < 3) {
  //   errors.title = 'Title must be at least 3 characters!'
  // }

  if (!values.title) {
    errors.title = 'Enter a title!'
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories'
  }

  if (!values.content) {
    errors.content = 'Enter some content please'
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux-form assumes form is inval
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(PostNew)
