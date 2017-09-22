import React from 'react';
import {Link} from 'react-router-dom';

class NavAdmin extends React.Component {
  
  render() {
    return (
      <div>
          <div className="nav__admin">
            <Link to='/admin/'><button className="nav__link">Main panel</button></Link>
            <Link to='/admin/add/agency'><button className="nav__link">Add agency</button></Link>
          </div>
      </div>
    );
  }
}

export default NavAdmin;
