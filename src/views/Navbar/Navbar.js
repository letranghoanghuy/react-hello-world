import React from 'react';
import logo from '../logo.svg';
import {
    Link, NavLink
} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/" exact={true}><img src={logo} width="55" /> Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/manage-users/list" activeClassName="active" exact={true}>Manage Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todo-lists" activeClassName="active" exact={true}>Todo List</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Navbar;