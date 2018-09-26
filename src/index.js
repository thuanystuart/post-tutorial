import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import App from './components/app'
import reducers from './reducers'

import PostsIndex from './components/posts-index'
import NewPost from './components/new-post'
import PostDetails from './components/post-details'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" exact component={NewPost} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/" exact component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.main')
)
