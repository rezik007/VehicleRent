import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

//Depending on the state, it renders LoginForm or RegisterForm

class LoginRegister extends React.Component {
  constructor() {
    super();

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);

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

  render() {
    const isLogin = this.state.isLogin;
    let myComponent = null;

    if (isLogin) {
      myComponent = <LoginForm />
    } else {
      myComponent = <RegisterForm />
    }

    return (
      <div className="loginRegister">
        <div className="navigation">
          <button className="navigation__login" onClick={this.handleLoginClick} value={this.state.isLogin}>Login</button>
          <button className="navigation__register" onClick={this.handleRegisterClick} value={this.state.isLogin}>Register</button>
        </div>
        <div className="body">
          {myComponent}
        </div>
      </div>
    );
	}
}

export default LoginRegister;
