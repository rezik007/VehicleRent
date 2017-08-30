import React from 'react';

//Simple component that renders form element
//It uses action attribute to POST login

class LoginForm extends React.Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/api/login', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "username": this.username.value,
       "password": this.password.value
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
      <form onSubmit={this.handleSubmit} action="http://localhost:8080/api/login"  method="post" className="loginForm">
        <input ref={(ref) => {this.username = ref}} type="text" name="name" className="loginForm__name" placeholder="Username" required/>
        <input ref={(ref) => {this.password = ref}} type="password" name="password" className="loginForm__password" placeholder="Password" required/>
        <div>
          <input type="checkbox" className="loginForm__remember" name="remember" id="remember"/>
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="loginForm__submit">LogIn</button>
        <a href="" className="loginForm__forgetPassword">Forget Password?</a>
      </form>
    )
  }
}

export default LoginForm;
