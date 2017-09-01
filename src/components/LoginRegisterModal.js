import React from 'react';

class LoginRegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCloseClick();
  }

  render() {
    let myClass = null;
    if (this.props.value.slice(0, 1) === 'Y') {
      myClass = "modal--success"
    } else {
      myClass = "modal--error"
    }
    
    return (
      <div className={"modal " + myClass}>
        <p className="modal__close" onClick={this.handleClick}>x</p>
        <p className="modal__info">{this.props.value}</p>
      </div>
    )
  }
}

export default LoginRegisterModal;
