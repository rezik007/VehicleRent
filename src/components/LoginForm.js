import React from 'react';

//Simple component that renders form element
//It uses action attribute to POST login

class LoginForm extends React.Component{
  render() {
    return(
      <form action="http://localhost:8080/api/login"  method="post" className="loginForm">
        <input type="text" name="name" className="loginForm__name" placeholder="Username" required/>
        <input type="password" name="password" className="loginForm__password" placeholder="Password" required/>
        <div>
          <input type="checkbox" className="loginForm__remember" name="remember" id="remember" required/>
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="loginForm__submit">LogIn</button>
        <a href="" className="loginForm__forgetPassword">Forget Password?</a>
      </form>
    )
  }
}

export default LoginForm;
