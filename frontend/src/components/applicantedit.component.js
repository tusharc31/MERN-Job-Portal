import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class signUpApplicant extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeemailid = this.onChangeemailid.bind(this);
        this.onChangeinstitutename = this.onChangeinstitutename.bind(this);
        this.onChangestartyear = this.onChangestartyear.bind(this);
        this.onChangeendyear = this.onChangeendyear.bind(this);
        this.onChangeskills = this.onChangeskills.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            emailid: '',
            institutename: 'School1, School2',
            startyear: 'YYYY, YYYY',
            endyear: 'YYYY, YYYY',
            skills: 'C++, Java, Python',
            rating: -1,
            ratingsum: 0,
            ratingtimes: 0,
            password: ''
        }
    }

    componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        axios.get('http://localhost:5000/applicant/' + us)
            .then(response => {
                console.log("Got data!");
                console.log(response.data[0].name);
                this.setState({
                    name: response.data[0].name,
                    emailid: response.data[0].emailid,
                    institutename: response.data[0].institutename,
                    startyear: response.data[0].startyear,
                    endyear: response.data[0].endyear,
                    skills: response.data[0].skills,
                    rating: Number(response.data[0].rating),
                    ratingsum: Number(response.data[0].ratingsum),
                    ratingtimes: Number(response.data[0].ratingtimes),
                    password: response.data[0].password
                })
            })

        // console.log(this.state.startyear);
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

    onChangeinstitutename(e) {
        this.setState({
            institutename: e.target.value
        });
    }

    onChangestartyear(e) {
        this.setState({
            startyear: e.target.value
        });
    }

    onChangeendyear(e) {
        this.setState({
            endyear: e.target.value
        });
    }

    onChangeskills(e) {
        this.setState({
            skills: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const applicant = {
            name: this.state.name,
            emailid: this.state.emailid,
            institutename: this.state.institutename,
            startyear: this.state.startyear,
            endyear: this.state.endyear,
            skills: this.state.skills,
            rating: Number(this.state.rating),
            ratingsum: Number(this.state.ratingsum),
            ratingtimes: Number(this.state.ratingtimes),
            password: this.state.password
        }



        var cm1 = 0;
        var cm2 = 0;
        var cm3 = 0;
        var ch2 = 0;
        var ch3 = 0;

        // console.log((String(this.state.startyear).length + 1)%5);

        if ((String(this.state.startyear).length + 1) % 5 != 0) {
            alert('Start years not entered in correct format (1)');
        }

        else if ((String(this.state.endyear).length + 1) % 5 != 0) {
            alert('End years not entered in correct format (1)');
        }

        else {

            for (var i = 0; i < this.state.institutename.length; i++) {
                if (this.state.institutename[i] == ',') {
                    cm1++;
                }
            }

            for (var i = 0; i < this.state.startyear.length; i++) {
                if ((i + 1) % 5 == 0 && this.state.startyear[i] == ',') {
                    cm2++;
                }

                else if ((i + 1) % 5 == 0 && this.state.startyear[i] != ',') {
                    console.log("Comes to 1");
                    ch2++;
                }

                else if (Number(this.state.startyear[i]) >= 0 && Number(this.state.startyear[i]) <= 9) {

                }

                else {
                    console.log("Comes to 2");
                    ch2++;
                }
            }

            for (var i = 0; i < this.state.endyear.length; i++) {
                if ((i + 1) % 5 == 0 && this.state.endyear[i] == ',') {
                    cm3++;
                }

                else if ((i + 1) % 5 == 0 && this.state.endyear[i] != ',') {
                    ch3++;
                }

                else if (i % 5 == 0 && this.state.endyear[i] == 'Y') {
                    var cnt = 0;

                    if (this.state.endyear[i] == 'Y') {
                        cnt = cnt + 1;
                    }

                    if (this.state.endyear[i + 1] == 'Y') {
                        cnt = cnt + 1;
                    }

                    if (this.state.endyear[i + 2] == 'Y') {
                        cnt = cnt + 1;
                    }


                    if (this.state.endyear[i + 3] == 'Y') {
                        cnt = cnt + 1;
                    }

                    if (cnt == 4) { }

                    else {
                        ch3++;
                    }
                }

                else if (i % 5 == 0 && this.state.endyear[i] >= 0 && this.state.endyear[i] <= 9) {
                    var cnt = 0;

                    if (this.state.endyear[i] >= 0 && this.state.endyear[i] <= 9) {
                        cnt = cnt + 1;
                    }

                    if (this.state.endyear[i + 1] >= 0 && this.state.endyear[i + 1] <= 9) {
                        cnt = cnt + 1;
                    }

                    if (this.state.endyear[i + 2] >= 0 && this.state.endyear[i + 2] <= 9) {
                        cnt = cnt + 1;
                    }


                    if (this.state.endyear[i + 3] >= 0 && this.state.endyear[i + 3] <= 9) {
                        cnt = cnt + 1;
                    }

                    if (cnt == 4) { }

                    else {
                        ch3++;
                    }
                }

                else if (i % 5 == 0) {
                    console.log("Comes to 3");
                    ch3++;
                }
            }

            if (ch2 > 0) {
                alert("Start year(s) entered in wrong format (2)");
            }

            else if (ch3 > 0) {
                alert("End years(s) entered in wrong format (2)");
            }

            else if (cm1 == cm2 && cm2 == cm3 && cm3 == cm1) {
                var us = localStorage.getItem("user");
                console.log(us);
                axios.post('http://localhost:5000/applicant/update/' + us, applicant)
                    .then(res => console.log(res.data));
                // .catch(window.location = '/error');
                // console.log(applicant)
                window.location = '/applicant/profile';
            }

            else {
                alert("Unequal number of educations entered");
            }
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
                        <label>Institute(s) attended: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.institutename}
                            onChange={this.onChangeinstitutename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start year(s) (compulsory): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.startyear}
                            onChange={this.onChangestartyear}
                        />
                    </div>
                    <div className="form-group">
                        <label>End year(s) (leave as YYYY if still in progress): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.endyear}
                            onChange={this.onChangeendyear}
                        />
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.skills}
                            onChange={this.onChangeskills}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
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