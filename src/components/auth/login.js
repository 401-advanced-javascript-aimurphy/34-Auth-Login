import React, { useContext, useState } from 'react';
import { LoginContext } from './context.js';

const If = props => {
  return !!props.condition ? props.children : null;
};

const Login =props=> {
  const loginContext = useContext(LoginContext);
  const [formData, setFormData] = useState({});

  // constructor(props) {
  //   super(props);
  //   this.state = { username: '', password: '' };
  // }

 
  const handleChange = e => {
    console.log('change',formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginContext.login(formData);
    console.log('submit',formData)
  };

    return (
      <>
        <If condition={loginContext.loggedIn}>
          <button onClick={loginContext.logout}>Log Out</button>
        </If>

        <If condition={!loginContext.loggedIn}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button>Login</button>
          </form>
        </If>
      </>
    );
  
}

export default Login;
