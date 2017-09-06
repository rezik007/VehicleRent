import React from 'react';

//Simple React component

class Home extends React.Component {
  render() {
    let user = this.props.username;

    return (
      <div className="section three">
        <h1 className="section__title">Welcome to VehicleRent {user}</h1>
      </div>
    );
  }
}

export default Home;
