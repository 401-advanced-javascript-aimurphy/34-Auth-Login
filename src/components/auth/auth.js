import React, {useContext} from 'react';
import { LoginContext } from './context';

const If = props => {
  return !!props.condition ? props.children : null;
};

const Auth = props=> {
  const loginContext = useContext(LoginContext);

  console.log('are you capable?',loginContext.capabilities);

    let okToRender = false;

    try {
      // loginContext.loggedIn &&
      //   (props.capability
      //     ? loginContext.user.capabilities.includes(props.capability)
      //     : true);
      let okToRender = loginContext.loggedIn === true;
      if (okToRender) {
        if (props.capability) {
          if (loginContext.capabilities.includes(props.capability)) {
            console.log('are you capable?',props.capability);
            okToRender = true;
          } else {
            okToRender = false;
          }
        } else {
          okToRender = true;
        }
      }
    } catch (e) {
      console.warn("Not Authorized");
    }

    // <Auth> <div /> </Auth>
    /// are you logged in?
    /// was there no capability specified?

    // <Auth capability="foo"> <div /> </Auth>
    /// are you logged in?
    /// Is there a capability that we care about?
    /// do you have it?

    return (
      <If condition={okToRender}>
        <div>{props.children}</div>
      </If>
    );
  
}

export default Auth;
