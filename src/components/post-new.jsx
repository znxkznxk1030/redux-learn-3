import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {
  renderTitleField(field) {
    console.log(field)
    return (
      <div>
        <input {...field.input} />
      </div>
    )
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderTitleField}></Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PostsNewForm',
})(PostNew)
