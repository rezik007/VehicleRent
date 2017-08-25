import React from 'react';
import LoginRegister from './LoginRegister';

//Simple React component that renders LoginRegister compoenent

class Login extends React.Component {
  render() {
    return (
      <div className="two container">
        <LoginRegister/>
      </div>
    );
  }
}

export default Login;
