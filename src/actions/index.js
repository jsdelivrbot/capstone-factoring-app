// using Thunk as middleware - all actions will return a function
// Thunk gets appllied in the main index.js file
import axios from "axios";
import { browserHistory } from 'react-router';
import {
  FETCH_TRINOMIAL,
  CHECK_TRINOMIAL,
  FETCH_REPORT,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = "http://localhost:3000";
// const ROOT_URL = "https://trinomial-factoring-api.herokuapp.com";

export function fetchTrinomial(pattern) {
  return function(dispatch) {
    console.log("fetching a new trinomial");
    axios.get(`${ROOT_URL}/trinomial/${pattern}`)
      .then( ({data}) => { dispatch( { type: FETCH_TRINOMIAL, payload: data } )
      }).catch(
        () => {}
      );
  }
}

export function checkTrinomial(values, pattern) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/trinomial/check`, values)
      .then(
        response => {
          dispatch( {type: CHECK_TRINOMIAL} );
          dispatch( fetchTrinomial(pattern) );
      }).catch(
        () => {}
      );
  }
}

export function fetchReport() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user/report`)
      .then( ({data}) => {
        console.log("go the report");
        dispatch({ type: FETCH_REPORT, payload: data })
      })
      .catch(
        () => {}
      );
  }
}

export function signinUser({username, password}) {
  return function(dispatch) {
    console.log("made it to singinUser");
    axios.post(`${ROOT_URL}/user/singin`, { username, password })
      .then( response => {
        // if good
        // update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // save JWT token in the local storage - managed by user's browser
        localStorage.setItem('token', response.data.auth_token);
        // redirect to route '/report'
        browserHistory.push("/report");
      }).catch(
        ()=> { dispatch( authError("Bad signin info") )}
      );
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
