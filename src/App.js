import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import Nav from './components/Nav';
import Main from './components/Main';
import Hamburger from './components/Hamburger';

//Base component that renders Nav, Main and Hamburger
//Addaed "react-resize-detector" package, that helps with running functions at screen resize
//Every time the window is resized, onResize function is called
//OnResize function is changeing the this.state.width to current windows width

class App extends React.Component {
  constructor() {
    super();

    this.handleHideNav = this.handleHideNav.bind(this);
    this.onResize = this.onResize.bind(this);

    this.state = {
      hamburgerClick: true,
      width: window.innerWidth
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

  render() {
    let nav = null;
    let hamburger = null;

    if(!this.state.hamburgerClick || this.state.width > 640) {
      nav = <Nav/>;
    }

    if(this.state.width <= 640) {
      hamburger = <Hamburger hideNav={this.handleHideNav}/>;
    }

    return (
      <div>
        <ReactResizeDetector handleWidth onResize={this.onResize} />
        {hamburger}
        {nav}
        <Main/>
      </div>
    );
  }
}

export default App;
