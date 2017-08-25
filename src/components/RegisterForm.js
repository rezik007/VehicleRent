import React from 'react';

//Simple component that renders form element
//It uses action attribute to POST createAccount

class RegisterForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
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
     alert("super");
   }).catch((err) => {
     console.error(err, "asdasd");
   })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="registerForm">
          <input ref={(ref) => {this.username = ref}} type="text" name="username" className="registerForm__name" placeholder="Username" required/>
          <input ref={(ref) => {this.email = ref}} type="email" name="email" className="registerForm__email" placeholder="Email" required/>
          <input ref={(ref) => {this.password = ref}} type="password" name="password" className="registerForm__password" placeholder="Password" required/>
          <input type="password" name="confirm-password" className="registerForm__password" placeholder="Confirm Password" required/>
          <input type="submit" className="registerForm__submit" value="Register" />
      </form>
    )
  }
}

export default RegisterForm;
