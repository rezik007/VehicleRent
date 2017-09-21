import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

//Depending on the state, it renders LoginForm or RegisterForm
//it passes modal, username, and loginSuccess values to its parents

class LoginRegister extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogin: true
    }
  }

  handleLoginClick() {
    this.setState({
      isLogin: true
    });
  }

  handleRegisterClick() {
    this.setState({
      isLogin: false
    });
  }

  handleRegisterSubmit(modal, type) {
    this.props.onRegisterSubmit(modal, type);
  }

  handleLoginSuccess() {
    this.props.onLoginSuccess();
  }

  handleLoginSubmit(modal, type) {
    this.props.onLoginSubmit(modal, type);
  }

  handleRegisterSuccess() {
    this.setState({
      isLogin: true
    })
  }

  handleSendUsername(username) {
    this.props.sendUsername(username);
  }

  render() {
    const isLogin = this.state.isLogin;
    let myComponent = null;

    if (isLogin) {
      myComponent = <LoginForm
                      onLoginSubmit={(modal, type) => this.handleLoginSubmit(modal, type)}
                      onLoginSuccess={() => this.handleLoginSuccess()}
                      sendUsername={(username) => this.handleSendUsername(username)}
                    />
    } else {
      myComponent = <RegisterForm
                      onRegisterSubmit={(modal, type) => this.handleRegisterSubmit(modal, type)}
                      onRegisterSuccess={() => this.handleRegisterSuccess()}
                    />
    }

    return (
      <div className="loginRegister">
        <div className="navigation">
          <button className="navigation__login"
            onClick={() => this.handleLoginClick()}
            value={this.state.isLogin}>
            Login
          </button>
          <button className="navigation__register"
            onClick={() => this.handleRegisterClick()}
            value={this.state.isLogin}>
            Register
          </button>
        </div>
        <div className="body">
          {myComponent}
        </div>
      </div>
    );
	}
}

export default LoginRegister;
