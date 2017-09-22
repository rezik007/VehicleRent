import React from 'react';

class LoginRegisterModal extends React.Component {
  handleClick() {
    this.props.onCloseClick();
  }

  render() {
    let myClass = null;

    if (this.props.type === 'success') {
      myClass = "modal--success";
    } else {
      myClass = "modal--error";
    }

    return (
      <div className={`modal ${myClass}`}>
        <p className="modal__close" onClick={() => this.handleClick()}>x</p>
        <p className="modal__info">{this.props.value}</p>
      </div>
    )
  }
}

export default LoginRegisterModal;
