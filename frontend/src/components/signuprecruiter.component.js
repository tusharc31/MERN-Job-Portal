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
            axios.post('http://localhost:5000/recruiter/add', recruiter)
                .then(res => console.log(res.data));
    
            window.location = '/';
        }

    }

    render() {
        return (
            <div className="container">
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
                <h3>SIGN UP AS A RECRUITER!</h3>
                <br>
                </br>
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
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangepassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}