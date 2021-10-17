import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label htmlFor="">{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
      </div>
    )
  }

  render() {
    return (
      <form>
        <Field label="Title" name="title" component={this.renderField}></Field>
        <Field label="Tags" name="tags" component={this.renderField}></Field>
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        ></Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PostsNewForm',
})(PostNew)
