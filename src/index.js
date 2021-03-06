import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Home from './components/home';
import RequireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import LearnPatterns from './components/trinomial/learn_patterns';
import TrinomialShow from './components/trinomial/trinomial_show';
import Report from './components/trinomial/trinomial_progress_report';

import '../style/style.css';

// Thunk is a middleware that we import - we can also write out own middleware
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// preparing token - if there is a token in the browser then user is signed in
const token = localStorage.getItem('token');
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="learn_patterns" component={ LearnPatterns } />
        <Route path="signin" component={ Signin } />
        <Route path="signup" component={ Signup } />
        <Route path="signout" component={ Signout } />
        <Route path="report" component={ RequireAuth(Report) } />
        <Route path="practice/:pattern" component={ RequireAuth(TrinomialShow) } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
