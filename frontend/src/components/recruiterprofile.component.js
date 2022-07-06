import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class recruiterapplications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            emailid: '',
            contactnumber: '',
            bio: '',
            password: ''
        }
    }

    componentDidMount() {
        var us = localStorage.getItem("user");
        console.log(us);

        axios.get('http://localhost:5000/recruiter/' + us)
            .then(response => {
                if (response.data.length > 0) {
                    console.log("Got data!");
                    
                    this.setState({
                        name: response.data[0].name,
                        emailid: response.data[0].emailid,
                        contactnumber: response.data[0].contactnumber,
                        bio: response.data[0].bio,
                        password: response.data[0].password,
                    })

                    // console.log(response.data[0].startyear);
                }
            });
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/recruiter/profile" className="nav-link">My profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recruiter/edit" className="nav-link">Edit profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recruiter/myjob" className="nav-link">My Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recruiter/employees" className="nav-link">Employees</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recruiter/createjob" className="nav-link">Create Job</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <div>
                    <br></br>
                    <h5>Name : {this.state.name}</h5><br></br>
                    <h5>Email ID : {this.state.emailid}</h5><br></br>
                    <h5>Contact Number : {this.state.contactnumber}</h5><br></br>
                    <h5>Bio : {this.state.bio}</h5><br></br>
                    <h5>Password : {this.state.password}</h5><br></br>
                </div>
            </div>
        )
    }
}