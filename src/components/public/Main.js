import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from './Home';
import About from './About';
import Login from './Login';
import Modal from '../shared/Modal';

import MainAdmin from '../admin/MainAdmin';

//Main uses Switch for group of routes
//Each Route has path that corresonds with Link's "to" from Nav component
//Main renders only one component Home, About, or Login
//This component render modals msgs when user try register/login
//This compoennt rerender different content depends on if user is loggedIn

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: '',
      type: '',
      username: ''
    }
  }

  handleOnCloseClick() {
    this.setState({
      modal: ''
    })
  }

  handleRegisterSubmit(modal, type) {
    this.setState({
      modal: modal,
      type: type
    })
  }

  handleLoginSubmit(modal, type) {
    this.setState({
      modal: modal,
      type: type
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
    let myHome = (props) => {
      return (
        <Home username={this.state.username}/>
      )
    }

    if(this.state.modal !== '') {
      modal = <Modal
                value={this.state.modal}
                type={this.state.type}
                onCloseClick={() => this.handleOnCloseClick()}
              />
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
              : (<Login
                  onLoginSubmit={(modal, type) => this.handleLoginSubmit(modal, type)}
                  onLoginSuccess={() => this.handleLoginSuccess()}
                  onRegisterSubmit={(modal, type) => this.handleRegisterSubmit(modal, type)}
                  sendUsername={(username) => this.handleSendUsername(username)}
                />)
            )} />
          <Route path='/admin/' component={MainAdmin} />
        </Switch>
      </div>
    );
  }
}

export default Main;
