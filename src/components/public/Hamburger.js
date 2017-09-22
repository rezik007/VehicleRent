import React from 'react';

//Simple React component

class Hamburger extends React.Component {
  handleClick() {
    this.props.hideNav();
  }

  render() {
    return (
      <div className="hamburger" onClick={() => this.handleClick()}>
      </div>
    );
  }
}

export default Hamburger;
