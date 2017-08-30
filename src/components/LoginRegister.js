import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LoginRegisterModal from './LoginRegisterModal';

//Depending on the state, it renders LoginForm or RegisterForm

class LoginRegister extends React.Component {
  constructor() {
    super();

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleOnCloseClick = this.handleOnCloseClick.bind(this);

    this.state = {
      isLogin: true,
      modal: ''
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

  handleRegisterSubmit(modal) {
    this.setState({
      modal: modal
    })
  }

  handleOnCloseClick() {
    this.setState({
      modal: ''
    })
  }

  render() {
    const isLogin = this.state.isLogin;
    let myComponent = null;
    let modal = null;

    if (isLogin) {
      myComponent = <LoginForm />
    } else {
      myComponent = <RegisterForm onRegisterSubmit={this.handleRegisterSubmit}/>
    }

    if(this.state.modal !== '') {
      modal = <LoginRegisterModal value={this.state.modal} onCloseClick={this.handleOnCloseClick}/>
    }

    return (
      <div className="loginRegister">
        {modal}
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
