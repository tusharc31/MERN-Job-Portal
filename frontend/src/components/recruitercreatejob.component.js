import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import DateTimePicker from 'react-datetime-picker'
import "react-datepicker/dist/react-datepicker.css";

import TextField from '@material-ui/core/TextField';

export default class recruiterapplications extends Component {

    constructor(props) {
        super(props);

        this.onChangetitle = this.onChangetitle.bind(this);
        // this.onChangerecruiterid = this.onChangerecruiterid.bind(this);
        // this.onChangerecruitername = this.onChangerecruitername.bind(this);
        this.onChangemax_applications = this.onChangemax_applications.bind(this);
        // this.onChangecurr_applications = this.onChangecurr_applications.bind(this);
        this.onChangemax_positions = this.onChangemax_positions.bind(this);
        // this.onChangecurr_positions = this.onChangecurr_positions.bind(this);
        // this.onChangepostingdate = this.onChangepostingdate.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangeskills = this.onChangeskills.bind(this);
        this.onChangejobtype = this.onChangejobtype.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        // this.onChangerating = this.onChangerating.bind(this);
        // this.onChangeratingsum = this.onChangeratingsum.bind(this);
        // this.onChangeratingtimes = this.onChangeratingtimes.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            recruiterid: '',
            recruitername: '',
            max_applications: 0,
            curr_applications: 0,
            max_positions: 0,
            curr_positions: 0,
            rem_positions: 0,
            postingdate: new Date(),
            deadline: new Date(),
            skills: '',
            jobtype: '',
            duration: 0,
            salary: 0,
            rating: -1,
            ratingsum: 0,
            ratingtimes: 0,
            status: '',
            color: '',
            users: []
        }
    }

    componentDidMount() {

        this.setState({
            users: ['Full-time', 'Part-time', 'Work from home'],
            jobtype: 'Full-time',
            rating: -1,
            ratingsum: 0,
            ratingtimes: 0,
            deadline: "2021-05-31T00:00"
        })

        var us = localStorage.getItem("user");
        console.log(us);

        axios.get('http://localhost:5000/recruiter/' + us)
            .then(response => {
                console.log("Got data!");
                // console.log(response.data[0].name);
                this.setState({
                    recruitername: response.data[0].name,
                    recruiterid: response.data[0].emailid
                })
            })

    }

    /////////////////////////// START OF ON CHANGE //////////////////////////

    onChangetitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangemax_applications(e) {
        this.setState({
            max_applications: e.target.value
        });
    }

    onChangemax_positions(e) {
        this.setState({
            max_positions: e.target.value,
            rem_positions: e.target.value
        });
    }

    onChangedeadline(e) {
        this.setState({
            deadline: e.target.value
        });
    }

    onChangeskills(e) {
        this.setState({
            skills: e.target.value
        });
    }

    onChangejobtype(e) {
        this.setState({
            jobtype: e.target.value
        });
    }

    onChangeduration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangesalary(e) {
        this.setState({
            salary: e.target.value
        });
    }

    ///////////////////////// END OF ON CHANGE /////////////////////

    onSubmit(e) {
        e.preventDefault();

        const job = {
            title: this.state.title,
            recruiterid: this.state.recruiterid,
            recruitername: this.state.recruitername,
            max_applications: Number(this.state.max_applications),
            curr_applications: Number(this.state.curr_applications),
            max_positions: Number(this.state.max_positions),
            curr_positions: Number(this.state.curr_positions),
            rem_positions: Number(this.state.max_positions),
            postingdate: this.state.postingdate,
            deadline: this.state.deadline,
            skills: this.state.skills,
            jobtype: this.state.jobtype,
            duration: Number(this.state.duration),
            salary: Number(this.state.salary),
            rating: Number(this.state.rating),
            ratingsum: Number(this.state.ratingsum),
            ratingtimes: Number(this.state.ratingtimes),
            status: this.state.status,
            color: this.state.color
        }

        // console.log(job);
        console.log(job.max_positions);
        console.log(Number.isInteger(job.max_positions) === false);


        if (Number.isInteger(job.max_applications) === false || job.max_applications <= 0) {
            alert("Max applications must be positive integer");
        }

        else if (Number.isInteger(job.max_positions) === false || job.max_positions <= 0) {
            alert("Max positions must be positive integer");
        }

        else if (Number.isInteger(job.duration) === false || job.duration < 0 || job.duration > 6) {
            alert("Duration must be a integer between 0 to 6 (inclusive)");
        }

        else if (Number.isInteger(job.salary) === false || job.salary <= 0) {
            alert("Salary must be positive integer");
        }

        else {
            console.log("All constraints are satisfied!");

            ///////////////////// UN-COMMENT THIS /////////////////////////
            axios.post('http://localhost:5000/job/add', job)
                .then(res => console.log(res.data));
            window.location = '/recruiter/myjob';
            //////////////////////////////////////////////////////////////
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
                <h3>Create a new job!</h3>
                <br>
                </br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangetitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Applications: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.max_applications}
                            onChange={this.onChangemax_applications}
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Positions: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.max_positions}
                            onChange={this.onChangemax_positions}
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <div>
                            <TextField
                                id="deadline"
                                type="datetime-local"
                                value={this.state.deadline}
                                onChange={this.onChangedeadline}
                            />
                        </div>
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
                        <label>Job Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.jobtype}
                            onChange={this.onChangejobtype}>
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
                        <label>Duration (in months): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeduration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.onChangesalary}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Job" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}