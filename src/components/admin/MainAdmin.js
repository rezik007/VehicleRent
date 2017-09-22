import React from 'react';
import {Switch, Route} from 'react-router-dom';

import NavAdmin from './NavAdmin';
import HomeAdmin from './HomeAdmin';
import AddAgency from './AddAgency';

import Modal from '../shared/Modal';

class MainAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: '',
            type: ''
        }
    }

    handleAddAgencySuccess(modal, type) {
        this.setState({
            modal: modal,
            type: type,
        })
    }

    handleOnCloseClick() {
        this.setState({
        modal: ''
        })
    }

    render () {
        let modal;
        let addAgency = () => {
        return (
            <AddAgency onAddAgencySuccess={(modal, type) => this.handleAddAgencySuccess(modal, type)} />
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
                <h1 className="h1__header">Admin Panel</h1>
                    <div className="nav__admin">
                        <NavAdmin />
                    </div>
                <div className="admin__container">
                    <Switch>
                    <Route exact path='/admin/' component={HomeAdmin} />
                    <Route path='/admin/add/agency' render={addAgency} />       
                    </Switch>
                </div>
            </div>
        );
    }

}

export default MainAdmin;