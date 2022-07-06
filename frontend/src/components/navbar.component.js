import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/applicant/profile" className="nav-link">My profile</Link>
          </li>
          <li className="navbar-item">
          <Link to="/applicant/edit" className="nav-link">Edit profile</Link>
          </li>
          <li className="navbar-item">
          <Link to="/applicant/jobs" className="nav-link">Job listings</Link>
          </li>
          <li className="navbar-item">
          <Link to="/applicant/applications" className="nav-link">My applications</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}