import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPost } from '../../actions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import LinkButton from '../link-button'

import styles from './styles.css'

class NewPost extends PureComponent {
  renderTitleField({
    name,
    label,
    required,
    margin,
    multiline,
    rows,
    meta,
    meta: { touched, error, submitFailed },
    input,
    ...custom
  }) {
    return (
      <div>
        <TextField
          className={styles['text-field']}
          name={name}
          label={label}
          margin={margin}
          multiline={multiline}
          rows={rows}
          error={error && touched}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      </div>
    )
  }

  onSubmit = values => {
    createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="title"
            label="Title for Post *"
            margin="normal"
            component={this.renderTitleField}
          />
          <Field
            name="categories"
            label="Categories *"
            margin="normal"
            component={this.renderTitleField}
          />
          <Field
            name="content"
            label="Post Content *"
            margin="normal"
            rows={4}
            multiline
            component={this.renderTitleField}
          />
          <div className={styles['form-footer']}>
            <LinkButton to="/" variant="text" color="default">
              Cancel
            </LinkButton>
            <Button type="submit" color="primary" variant="contained">
              Add Post
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = 'Please, enter a title.'
  }
  if (!values.content) {
    errors.content = 'Please, enter the content of the post.'
  }
  if (!values.categories) {
    errors.categories = 'Please, enter some categories.'
  }
  return errors
}

export default reduxForm({
  form: 'PostNewForm',
  validate,
})(
  connect(
    null,
    { createPost }
  )(NewPost)
)
