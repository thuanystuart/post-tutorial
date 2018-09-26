import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import LinkButton from '../link-button'

import styles from './styles.css'

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPosts = () => {
    return _.map(this.props.posts, post => {
      return (
        <ListItem key={post.id} button>
          <ListItemText
            primary={post.title}
            onClick={() => {
              this.postClicked(post.id)
            }}
          />
        </ListItem>
      )
    })
  }

  postClicked = id => {
    this.props.history.push('/posts/' + id)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Posts</h1>
          <LinkButton to="posts/new">Add Post</LinkButton>
        </div>
        <List component="nav" className={styles.list}>
          {this.renderPosts()}
        </List>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsIndex)
