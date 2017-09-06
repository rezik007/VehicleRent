import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginRegisterModal from './LoginRegisterModal';

import Home from './Home';
import About from './About';
import Login from './Login';

//Main uses Switch for group of routes
//Each Route has path that corresonds with Link's "to" from Nav component
//Main renders only one component Home, About, or Login
//This component render modals msgs when user try register/login
//This compoennt rerender different content depends on if user is loggedIn 

class Main extends React.Component {
  constructor() {
    super();

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleOnCloseClick = this.handleOnCloseClick.bind(this);
    this.handleSendUsername = this.handleSendUsername.bind(this);

    this.state = {
      modal: '',
      username: ''
    }
  }

  handleOnCloseClick() {
    this.setState({
      modal: ''
    })
  }

  handleRegisterSubmit(modal) {
    this.setState({
      modal: modal
    })
  }

  handleLoginSubmit(modal) {
    this.setState({
      modal: modal
    })
  }

  handleLoginSuccess() {
    this.props.onLoginSuccess()
  }

  handleSendUsername(username) {
    this.setState({
      username: username
    })
  }

  render() {
    let loggedIn = this.props.isLoggedIn;
    let modal = null;
    let myHome = (props) =>{
      return (
        <Home username={this.state.username}/>
      )
    }

    if(this.state.modal !== '') {
      modal = <LoginRegisterModal value={this.state.modal} onCloseClick={this.handleOnCloseClick}/>
    }

    return (
      <div>
        {modal}
        <Switch>
          <Route exact path='/' render={myHome} />
          <Route path='/about' component={About} />
          <Route path='/login' render={() => (
              loggedIn
              ? (<Redirect to="/"/>)
              : (<Login onLoginSuccess={this.handleLoginSuccess} onLoginSubmit={this.handleLoginSubmit} onRegisterSubmit={this.handleRegisterSubmit} sendUsername={this.handleSendUsername}/>)
            )} />
        </Switch>
      </div>
    );
  }
}

export default Main;
