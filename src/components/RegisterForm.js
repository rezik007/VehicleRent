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
    this.setState({
      password: e.target.value
    }, function() {
      this.passwordCompare();
    });
  }

  handleRepeatPasswordChange(e) {
    this.setState({
      repeatPassword: e.target.value
    }, function() {
      this.passwordCompare();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.checkPassword()) {
      this.props.onRegisterSubmit('Invalid Password.', 'error');
      return;
    }
    fetch(apiURL + 'user/register', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "email": this.email.value,
        "password": this.password.value
      })
    })
    .then((response) => {
       let msgType;
       if(response.status === 201) {
         msgType = 'success';
       } else {
         msgType = 'error';
       }
      response.json().then((obj) => {
      this.props.onRegisterSubmit(obj.msg, msgType);
      })
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="form">
        <input ref={(ref) => {this.email = ref}} type="email" name="email" id="email" className="form__input" placeholder="Email" required/>
        {!this.state.areTheSame ? <label htmlFor="password" className="form__passwordCompare">Passwords do not match!</label> : ''}
        <input id="password" onChange={this.handlePasswordChange} ref={(ref) => {this.password = ref}} type="password" name="password" className="form__input" placeholder="Password" required/>
        <input onChange={this.handleRepeatPasswordChange} type="password" name="confirm-password" className="form__input" placeholder="Confirm Password" required/>
        <button type="submit" className="form__submit">Register</button>
      </form>
    )
  }
}

export default RegisterForm;
