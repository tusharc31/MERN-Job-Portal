import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class applicantupload extends Component {

    constructor(props) {
        super(props);

        this.smbt1 = this.smbt1.bind(this);
        this.smbt2 = this.smbt2.bind(this);

        this.state = {
            dp1: null,
            dp2: null
        };
    }

    componentDidMount() {

        // var us = localStorage.getItem("user");
        // console.log(us);
    }

    async fup1(ev) {
        this.setState({
            dp1: ev.target.files[0]
        })
    }

    async fup2(ev) {
        this.setState({
            dp2: ev.target.files[0]
        })
    }

    async smbt1() {
        var fd = new FormData();

        var us = localStorage.getItem("user");
        console.log(us);

        if (this.state.dp1 == null) {
            alert("Upload an image first");
        }

        else {

            fd.append("emailid", us);
            fd.append("dp1", this.state.dp1);

            console.log(fd);

            await axios.post('http://localhost:5000/applicant/image/' + us, fd)
                .then(res => (console.log(res.data)));
        }
    }

    async smbt2() {
        var fd = new FormData();
        var us = localStorage.getItem("user");

        if (this.state.dp2 == null) {
            alert("Upload resume first");
        }

        else {

            fd.append("emailid", us);
            fd.append("dp2", this.state.dp2);

            await axios.post('http://localhost:5000/applicant/resume/' + us, fd)
                .then(res => (console.log(res.data)));
        }
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
                    <h4>Add / edit your resume and image!</h4>
                    <br></br>
                    <br></br>

                    <h4>Profile Image</h4>
                    <br></br>
                    <p><input type="file" onChange={this.fup1.bind(this)}></input></p>

                    <button
                        onClick={() => this.smbt1()}
                        style={{
                            width: "75px",
                            borderRadius: "1.5px",
                            letterSpacing: ".75px"
                        }}
                    // className="btn"
                    >
                        Submit
                                            </button>


                    <br></br>
                    <br></br>
                    <br></br>
                    <h4>Resume</h4>
                    <br></br>
                    <p><input type="file" onChange={this.fup2.bind(this)}></input></p>

                    <button
                        onClick={() => this.smbt2()}
                        style={{
                            width: "75px",
                            borderRadius: "1.5px",
                            letterSpacing: ".75px"
                        }}
                    // className="btn"
                    >
                        Submit
                                            </button>

                </div>
            </div>
        )
    }
}