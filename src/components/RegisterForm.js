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
    e.preventDefault();
    if (!this.checkPassword()) {
      this.props.onRegisterSubmit('Invalid Password.');
      return;
    }
    fetch(apiURL + 'user/register', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "username": this.username.value,
        "email": this.email.value,
        "password": this.password.value
      })
    })
    .then(res => res.json()
      .then(data => ({data: data}))
      .then(res => this.props.onRegisterSubmit(res.data.msg))
    )
    .catch(error => console.log('error': error))
  }

  render() {
    let passwordLabel = null;

    if (!this.state.areTheSame) {
      passwordLabel = <label htmlFor="password" className="form__passwordCompare">Passwords do not match!</label>;
    }

    return(
      <form onSubmit={this.handleSubmit} className="form">
        <input ref={(ref) => {this.username = ref}} type="text" name="username" className="form__input" placeholder="Username" required/>
        <input ref={(ref) => {this.email = ref}} type="email" name="email" className="form__input" placeholder="Email" required/>
        {passwordLabel}
        <input id="password" onKeyUp={this.handlePasswordChange} ref={(ref) => {this.password = ref}} type="password" name="password" className="form__input" placeholder="Password" required/>
        <input onKeyUp={this.handleRepeatPasswordChange} type="password" name="confirm-password" className="form__input" placeholder="Confirm Password" required/>
        <button type="submit" className="form__submit">Register</button>
      </form>
    )
  }
}

export default RegisterForm;
