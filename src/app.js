import React from 'react';

import ToDo from './components/todo/todo.js';

import LoginContext from './components/auth/context.js';

import Login from './components/auth/login.js';

import Auth from './components/auth/auth.js';

export default class App extends React.Component {
  render() {
    return (
      <>
      <LoginContext>
      <Login />
      {/* <Auth> */}
      <ToDo />
      {/* </Auth> */}
      </LoginContext>
      </>
    );
  }
}
