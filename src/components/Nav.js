import React from 'react';
import {Link} from 'react-router-dom';

//Nav uses {Link} to redirect user to corresponding routes
//and corresponding views from Main
//Nav alos renders two buttons depending on if user is loggedIn
//If user is logged in it renders Logout, else it renders Login
//Logout button onClick is fetching '/logout', and

class Nav extends React.Component {
  handleLogoutClick() {
    fetch('/logout', {
      method: 'POST'
    })
    .then(() => window.location.reload())
  }

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let loginLogout = null;

    if(isLoggedIn) {
      loginLogout = <button onClick={() => this.handleLogoutClick()} className="nav__link">LogOut</button>
    } else {
      loginLogout = <Link to='/login'><button className="nav__link">LogIn</button></Link>
    }

    return (
      <div>
        <div className="nav">
          <div className="nav__links">
            <Link to='/'><button className="nav__link">Home</button></Link>
            <Link to='/about'><button className="nav__link">About</button></Link>
            {loginLogout}
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
