import React from 'react';
import apiURL from '../config';

//Simple component that renders form element
//It uses action attribute to POST createAccount

class RegisterForm extends React.Component{
  constructor(props) {
    super(props);

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
      <form className="form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <input type="email" name="email" id="email" className="form__input" placeholder="Email" required
          ref={(ref) => {this.email = ref}}
        />
        {
          !this.state.areTheSame
          ? <label htmlFor="password" className="form__passwordCompare">Passwords do not match!</label>
          : ''
        }
        <input id="password" type="password" name="password" className="form__input" placeholder="Password" required
          onChange={(e) => this.handlePasswordChange(e)}
          ref={(ref) => {this.password = ref}}
          />
        <input type="password" name="confirm-password" className="form__input" placeholder="Confirm Password" required
          onChange={(e) => this.handleRepeatPasswordChange(e)}
        />
        <button type="submit" className="form__submit">Register</button>
      </form>
    )
  }
}

export default RegisterForm;
