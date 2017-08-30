import React from 'react';

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
      repeatPassword: ''
    }
  }

  checkPassword() {
    return this.state.password === this.state.repeatPassword;
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({
      password: value
    });
  }

  handleRepeatPasswordChange(e) {
    const value = e.target.value;
    this.setState({
      repeatPassword: value
    });
  }

  handleSubmit(e) {
    const messages = ['Invalid Username or Password.', 'Your Registration was successfull! :)', 'Something went wrong! :(']
    e.preventDefault();
    if (!this.checkPassword()) {
      this.props.onRegisterSubmit(messages[0]);
      return;
    }
    fetch('http://localhost:8080/api/createAccount', {
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
    return(
      <form onSubmit={this.handleSubmit} className="registerForm">
        <input ref={(ref) => {this.username = ref}} type="text" name="username" className="registerForm__name" placeholder="Username" required/>
        <input ref={(ref) => {this.email = ref}} type="email" name="email" className="registerForm__email" placeholder="Email" required/>
        <input onChange={this.handlePasswordChange} ref={(ref) => {this.password = ref}} type="password" name="password" className="registerForm__password" placeholder="Password" required/>
        <input onChange={this.handleRepeatPasswordChange} type="password" name="confirm-password" className="registerForm__password" placeholder="Confirm Password" required/>
        <input type="submit" className="registerForm__submit" value="Register" />
      </form>
    )
  }
}

export default RegisterForm;
