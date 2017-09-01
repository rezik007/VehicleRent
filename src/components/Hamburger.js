import React from 'react';

//Simple React component

class Hamburger extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.hideNav();
  }

  render() {
    return (
      <div className="hamburger" onClick={this.handleClick}>
      </div>
    );
  }
}

export default Hamburger;
