import React from 'react';
import apiURL from '../config';

//Simple React component

class AddAgency extends React.Component {
  
    handleSubmit(e) {
    e.preventDefault();
    fetch(apiURL + 'admin/add/agency', {
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
       } else {
         msgType = 'error';
       }
      response.json().then((obj) => {
      this.props.onAddAgencySuccess(obj.msg, msgType);
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

export default AddAgency;
