import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class signIn extends Component {

  constructor(props) {
    super(props);

    this.onChangetype = this.onChangetype.bind(this);
    this.onChangeemailid = this.onChangeemailid.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: '',
      emailid: '',
      password: '',
      users: []
    }
  }

  componentDidMount() {
    this.setState({
      users: ['Recruiter', 'Applicant'],
      type: 'Recruiter'
    })

    localStorage.setItem("key", "-1");
    // var lastname = localStorage.getItem("key");
    // console.log(lastname);
  }

  onChangetype(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeemailid(e) {
    this.setState({
      emailid: e.target.value
    });
  }

  onChangepassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      type: this.state.type,
      emailid: this.state.emailid,
      password: this.state.password,
    }

    console.log(user);

    if (this.state.type === 'Recruiter') {
      console.log("Recruiter confirmed!");

      axios.get('http://localhost:5000/recruiter/' + this.state.emailid)
        .then(response => {
          if (response.data.length > 0) {
            if (this.state.password === response.data.map(recruiter => recruiter.password)[0]) {
              console.log("password matches");
              localStorage.setItem("user", this.state.emailid);           // setting in local storage
              // var us = localStorage.getItem("user");
              // console.log(us);
              // console.log(this.state.emailid);
              window.location="/recruiter/profile"
            }
            else {
              window.location = '/error';
            }
          }

          else {
            window.location = '/error';
          }
        })
    }

    else {
      console.log("Applicant confirmed!");

      axios.get('http://localhost:5000/applicant/' + this.state.emailid)
        .then(response => {
          if (response.data.length > 0) {
            if (this.state.password === response.data.map(applicant => applicant.password)[0]) {
              console.log("password matches");
              localStorage.setItem("user", this.state.emailid);
              window.location = "/applicant/profile"
            }
            else {
              console.log("Error : password doesn't match")
            }
          }

          else {
            console.log("Error in input")
          }
        })
    }
  }

  render() {
    return (
      <div className="container">

        {/* <Navbar /> */}
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          {/* <Link to="/" className="navbar-brand">Sign In</Link> */}
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Sign in</Link>
              </li>
              <li className="navbar-item">
                <Link to="/signUpRecruiter" className="nav-link">Sign Up as Recruiter</Link>
              </li>
              <li className="navbar-item">
                <Link to="/signUpApplicant" className="nav-link">Sign Up as Applicant</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br></br>
        <h3>SIGN IN</h3>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Profile</label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangetype}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Email ID: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.emailid}
              onChange={this.onChangeemailid}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
} 