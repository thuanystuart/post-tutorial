import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import LinkButton from '../link-button'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { fetchPost, deletePost } from '../../actions'

import styles from './styles.css'

class PostDetails extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params
      this.props.fetchPost(id)
    }
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div className={classnames(styles.container, styles.loading)}>Loading...</div>
    }

    return (
      <div className={styles.container}>
        <div className={styles['button-container']}>
          <LinkButton to="/">Back</LinkButton>
          <Button onClick={this.onDeleteClick} variant="contained" color="default">
            Delete
            <DeleteIcon fontSize="small" className={styles['button-icon']} />
          </Button>
        </div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p className={styles.content}>{post.content}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }, ownProps) => ({ post: posts[ownProps.match.params.id] })

const mapDispatchToProps = { fetchPost, deletePost }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
