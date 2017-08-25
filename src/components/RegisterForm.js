import React from 'react';

//Simple component that renders form element
//It uses action attribute to POST createAccount

class RegisterForm extends React.Component{
  render() {
    return(
      <form action="http://localhost:8080/api/createAccount" method="post" className="registerForm">
          <input type="text" name="username" className="registerForm__name" placeholder="Username" required/>
          <input type="email" name="email" className="registerForm__email" placeholder="Email" required/>
          <input type="password" name="password" className="registerForm__password" placeholder="Password" required/>
          <input type="password" name="confirm-password" className="registerForm__password" placeholder="Confirm Password" required/>
          <input type="submit" className="registerForm__submit" value="Register" />
      </form>
    )
  }
}

export default RegisterForm;
