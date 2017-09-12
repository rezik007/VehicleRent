import React from 'react';
import LoginRegister from './LoginRegister';

//Simple React component that renders LoginRegister compoenent
//it passes modal, username, and loginSuccess values to its parents

class Login extends React.Component {
  handleLoginSuccess() {
    this.props.onLoginSuccess();
  }

  handleRegisterSubmit(modal, type) {
    this.props.onRegisterSubmit(modal, type);
  }

  handleLoginSubmit(modal, type) {
    this.props.onLoginSubmit(modal, type);
  }

  handleSendUsername(username) {
    this.props.sendUsername(username)
  }

  render() {
    return (
      <div className="section two">
        <LoginRegister
          onLoginSuccess={() => this.handleLoginSuccess()}
          onLoginSubmit={(modal, type) => this.handleLoginSubmit(modal, type)}
          onRegisterSubmit={(modal, type) => this.handleRegisterSubmit(modal, type)}
          sendUsername={(username) => this.handleSendUsername(username)}/>
      </div>
    );
  }
}

export default Login;
