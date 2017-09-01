import React from 'react';
import apiURL from '../config';
//Simple component that renders form element
//It uses action attribute to POST login

class LoginForm extends React.Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(apiURL + 'api/login', {
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
      <form onSubmit={this.handleSubmit} method="post" className="form">
        <input ref={(ref) => {this.username = ref}} type="text" name="name" className="form__input" placeholder="Username" required/>
        <input ref={(ref) => {this.password = ref}} type="password" name="password" className="form__input" placeholder="Password" required/>
        <div>
          <input type="checkbox" className="form__remember" name="remember" id="remember"/>
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="form__submit">LogIn</button>
        <a href="" className="form__forgetPassword">Forget Password?</a>
      </form>
    )
  }
}

export default LoginForm;
