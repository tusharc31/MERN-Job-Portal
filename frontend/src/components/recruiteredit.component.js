import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class signUpRecruiter extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeemailid = this.onChangeemailid.bind(this);
        this.onChangecontactnumber = this.onChangecontactnumber.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            emailid: '',
            contactnumber: '',
            bio: '',
            password: '',
        }
    }

    componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        axios.get('http://localhost:5000/recruiter/' + us)
            .then(response => {
                console.log("Got data!");
                console.log(response.data[0].name);
                this.setState({
                    name: response.data[0].name,
                    emailid: response.data[0].emailid,
                    contactnumber: response.data[0].contactnumber,
                    bio: response.data[0].bio,
                    password: response.data[0].password
                })
            })

    }

    onChangebio(e) {
        this.setState({
            bio: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeemailid(e) {
        this.setState({
            emailid: e.target.value
        });
    }

    onChangecontactnumber(e) {
        this.setState({
            contactnumber: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const recruiter = {
            name: this.state.name,
            emailid: this.state.emailid,
            contactnumber: Number(this.state.contactnumber),
            bio: this.state.bio,
            password: this.state.password
        }

        if (recruiter.bio.split(" ").length > 250) {
            alert("Bio can't longer than 250 words");
        }

        else if (String(recruiter.contactnumber).length != 10 || Number.isInteger(recruiter.contactnumber) === false) {
            alert("Phone number invalid!")
        }

        else {
            console.log(recruiter);
            var us = localStorage.getItem("user");
            console.log(us);
            axios.post('http://localhost:5000/recruiter/update/' + us, recruiter)
                .then(res => console.log(res.data));
            window.location = '/recruiter/profile';
        }
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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Email ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.emailid}
                            onChange={this.onChangeemailid}
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.contactnumber}
                            onChange={this.onChangecontactnumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.bio}
                            onChange={this.onChangebio}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="type"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangepassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}