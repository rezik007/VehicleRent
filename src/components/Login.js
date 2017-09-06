import React from 'react';
import LoginRegister from './LoginRegister';

//Simple React component that renders LoginRegister compoenent
//it passes modal, username, and loginSuccess values to its parents

class Login extends React.Component {
  constructor() {
    super();

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleSendUsername = this.handleSendUsername.bind(this);
  }

  handleRegisterSubmit(modal) {
    this.props.onRegisterSubmit(modal);
  }

  handleLoginSubmit(modal) {
    this.props.onLoginSubmit(modal);
  }

  handleLoginSuccess() {
    this.props.onLoginSuccess();
  }

  handleSendUsername(username) {
    this.props.sendUsername(username)
  }

  render() {
    return (
      <div className="section two">
        <LoginRegister onLoginSuccess={this.handleLoginSuccess} onLoginSubmit={this.handleLoginSubmit} onRegisterSubmit={this.handleRegisterSubmit} sendUsername={this.handleSendUsername}/>
      </div>
    );
  }
}

export default Login;
