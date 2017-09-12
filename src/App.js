import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import Nav from './components/Nav';
import Main from './components/Main';
import Hamburger from './components/Hamburger';

//Base component that renders Nav, Main and Hamburger
//Addaed "react-resize-detector" package, that helps with running functions at screen resize
//Every time the window is resized, onResize function is called
//OnResize function is changeing the this.state.width to current windows width
//This component is holding loggedIn value, which is false in it's state
//LoggedIn value changes to true when user is successfully loggedIn

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      hamburgerClick: true,
      width: window.innerWidth,
      loggedIn: false
    }
  }

  handleHideNav() {
    this.setState({
      hamburgerClick: !this.state.hamburgerClick
    });
  }

  onResize() {
    this.setState({
      width: window.innerWidth
    })
  }

  handleLoginSuccess() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    let nav = null;
    let hamburger = null;

    if(!this.state.hamburgerClick || this.state.width > 640) {
      nav = <Nav isLoggedIn={this.state.loggedIn}/>;
    }

    if(this.state.width <= 640) {
      hamburger = <Hamburger hideNav={() => this.handleHideNav()}/>;
    }

    return (
      <div>
        <ReactResizeDetector handleWidth onResize={() => this.onResize()}/>
        {hamburger}
        {nav}
        <Main isLoggedIn={this.state.loggedIn} onLoginSuccess={() => this.handleLoginSuccess()}
        />
      </div>
    );
  }
}

export default App;
