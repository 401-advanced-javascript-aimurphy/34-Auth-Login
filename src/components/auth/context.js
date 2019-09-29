import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API = process.env.REACT_APP_API;

const testLogins = {
  testAdmin: process.env.REACT_APP_ADMIN_TOKEN || '',
  testEditor: process.env.REACT_APP_EDITOR_TOKEN || '',
  testUser: process.env.REACT_APP_USER_TOKEN || '',
};

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      user: {},
    };
  }

  login = (user) => {
    // This is foul and unsafe ... but when working offline / testmode ess oh kay
    console.log('contextlogin', '❤️',user.password);
    if (testLogins[user.username]) {
      this.validateToken(testLogins[user.username]);
    }
    else {
      fetch(`${API}/signin`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: new Headers({
          "Authorization": `Basic ${btoa(`${user.username}:${user.password}`)}`
        })
      })
        .then(response => response.text())
        .then(token => this.validateToken(token))
        .catch(console.error);
    }

    // fetch(`${API}/signin`, {
    //   method: 'post',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   headers: new Headers({
    //     "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    //     })
    //   })
    //   .then(response => response.text())
    //   .then(token => this.validateToken(token))
    //   .catch(console.error);
  }

  validateToken = token => {
    // try {
    //   let user = jwt.verify(token, process.env.REACT_APP_SECRET)
    //   console.log('all good');
    //   this.setLoginState(true, token, user);
    // }
    // catch (e) {
    //   this.setLoginState(false, null, {});
    //   console.log("Token Validation Error", e);
    // }
    console.log('⚠️',token);
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      if (user.id) {
        cookie.save('auth', token);
        this.setState({ loggedIn: true, capabilities: user.capabilities });
        console.log('capable of',user.capabilities);
      }
    } catch (e) {
      console.error(e);
    }

  };

  logout = () => {
    // this.setLoginState(false, null, {});
    cookie.save('auth', null);
    this.setState({ loggedIn: false });

  };

  // setLoginState = (loggedIn, token, user) => {
  //   cookie.save('auth', token);
  //   this.setState({ token, loggedIn, user });
  // };

  componentDidMount() {
    let token = cookie.load('auth');
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
