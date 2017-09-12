import React from 'react';
import apiURL from '../config';

//Simple component that renders form element
//It uses action attribute to POST login

class LoginForm extends React.Component{
  handleSubmit(e) {
    e.preventDefault();
    fetch(apiURL + 'user/login', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "email": this.email.value,
       "password": this.password.value
     })
    })
    .then((response) => {
       let msgType;
       if(response.status === 200) {
         msgType = 'success';
         console.log(response);
         this.props.sendUsername(this.email.value);
         this.props.onLoginSuccess();
       } else {
         msgType = 'error';
       }
      response.json().then((obj) => {
      this.props.onLoginSubmit(obj.msg, msgType);
      })
    })
}

  render() {
    return(
      <form method="post" className="form" onSubmit={(e) => this.handleSubmit(e)} >
        <input type="text" name="email" className="form__input" placeholder="Email" required ref={(ref) => {this.email = ref}}/>
        <input type="password" name="password" className="form__input" placeholder="Password" required ref={(ref) => {this.password = ref}}/>
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
