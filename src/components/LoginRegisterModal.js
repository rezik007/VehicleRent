import React from 'react';

class LoginRegisterModal extends React.Component {

  myClass = null;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCloseClick();
  }

  render() {

    if (this.props.type === 'success') {
      this.myClass = "modal--success";
      
    } else {
      this.myClass = "modal--error";
    }
    return (
      <div className={"modal " + this.myClass}>
        <p className="modal__close" onClick={this.handleClick}>x</p>
        <p className="modal__info">{this.props.value}</p>
      </div>
    )
  }
}

export default LoginRegisterModal;
