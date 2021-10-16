import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {
  render() {
    return (
      <form>
        <Field name="title" component={}></Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PostsNewForm',
})(PostNew)
