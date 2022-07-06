import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class applicantprofile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            emailid: '',
            institutename: '',
            startyear: '',
            endyear: '',
            skills: '',
            rating: 0,
            password: ''
        }
    }

    componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        axios.get('http://localhost:5000/applicant/' + us)
            .then(response => {
                if (response.data.length > 0) {
                    console.log("Got data!");

                    this.setState({
                        name: response.data[0].name,
                        emailid: response.data[0].emailid,
                        institutes: response.data[0].institutename,
                        startyears: response.data[0].startyear,
                        endyears: response.data[0].endyear,
                        skills: response.data[0].skills,
                        rating: Number(response.data[0].rating),
                        password: response.data[0].password
                    })

                    console.log(response.data[0].startyear);
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
                                <Link to="/applicant/upload" className="nav-link">Upload</Link>
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
                    <h5>Institutes attended : {this.state.institutes}</h5><br></br>
                    <h5>Start years (respectively): {this.state.startyears}</h5><br></br>
                    <h5>End years (respectively): {this.state.endyears}</h5><br></br>
                    <h5>Rating : {this.state.rating}</h5><br></br>
                    <h5>Skills : {this.state.skills}</h5><br></br>
                    <h5>Password : {this.state.password}</h5>
                </div>
            </div>
        )
    }
}