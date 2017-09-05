import React from 'react';
import apiURL from '../config';
//Simple component that renders form element
//It uses action attribute to POST login

class LoginForm extends React.Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleErrors(response) {
  //   if (!response.ok) {
  //       throw new Error(response.json());
  //   } else {
  //   return response.json();
  //   }
  // }

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
    .then(res => res.json()
    .then(res => this.props.onLoginSubmit(res.msg))
    .then(
      // this.props.onLoginSuccess(),
      console.log(res)
    )
    )
    .catch(error => console.log('error': error))
  //   .then(response => {this.handleErrors(response)})
  //   .then(response => {
  //       console.log('success', response);
  //   })
  //   .catch((error) => {
  //     console.log('error', error);
  //    //show message only when there are problems with network!
  //  })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} method="post" className="form">
        <input ref={(ref) => {this.email = ref}} type="text" name="email" className="form__input" placeholder="email" required/>
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
