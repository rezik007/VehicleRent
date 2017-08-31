import React from 'react';
import apiURL from '../config';

//Simple component that renders form element
//It uses action attribute to POST createAccount

class RegisterForm extends React.Component{
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);

    this.state = {
      password: '',
      repeatPassword: '',
      areTheSame: true
    }
  }

  checkPassword() {
    return this.state.password === this.state.repeatPassword;
  }

  passwordCompare() {
    if(!this.checkPassword()) {
      this.setState({
        areTheSame: false
      })
    } else {
      this.setState({
        areTheSame: true
      })
    }
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({
      password: value
    }, function() {
      this.passwordCompare();
    });
  }

  handleRepeatPasswordChange(e) {
    const value = e.target.value;
    this.setState({
      repeatPassword: value
    }, function() {
      this.passwordCompare();
    });
  }

  handleSubmit(e) {
    const messages = ['Invalid Password.', 'Your Registration was successfull! :)', 'Something went wrong! :(']
    e.preventDefault();
    if (!this.checkPassword()) {
      this.props.onRegisterSubmit(messages[0]);
      return;
    }
    fetch(apiURL + 'api/createAccount', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "username": this.username.value,
       "email": this.email.value,
       "password": this.password.value,
     })
   }).then((res) => {
     console.log('success', res.status);
     this.props.onRegisterSubmit(messages[1]);
   }).catch((err) => {
     console.error(err);
     this.props.onRegisterSubmit(messages[2]);
   })
  }

  render() {
    let passwordLabel = null;

    if (!this.state.areTheSame) {
      passwordLabel = <label htmlFor="password" className="registerForm__passwordCompare">Passwords do not match!</label>;
    }

    return(
      <form onSubmit={this.handleSubmit} className="registerForm">
        <input ref={(ref) => {this.username = ref}} type="text" name="username" className="registerForm__name" placeholder="Username" required/>
        <input ref={(ref) => {this.email = ref}} type="email" name="email" className="registerForm__email" placeholder="Email" required/>
        {passwordLabel}
        <input id="password" onKeyUp={this.handlePasswordChange} ref={(ref) => {this.password = ref}} type="password" name="password" className="registerForm__password" placeholder="Password" required/>
        <input onKeyUp={this.handleRepeatPasswordChange} type="password" name="confirm-password" className="registerForm__password" placeholder="Confirm Password" required/>
        <input type="submit" className="registerForm__submit" value="Register" />
      </form>
    )
  }
}

export default RegisterForm;
