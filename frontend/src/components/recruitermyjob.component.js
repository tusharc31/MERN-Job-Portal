import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class UsersList extends Component {

    constructor(props) {
        super(props);

        this.deletejob = this.deletejob.bind(this);
        this.editjob = this.editjob.bind(this);
        this.perjob = this.perjob.bind(this);
        this.onChangemax_applications = this.onChangemax_applications.bind(this);
        this.onChangemax_positions = this.onChangemax_positions.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);

        this.state = {
            jobs: [],
            sortedUsers: [],
            sortName: true,
            max_applications: '',
            max_positions: '',
            deadline: "2021-05-31T00:00"
        };
    }

    async componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        await axios.get('http://localhost:5000/job/onlyleft/' + us)
            .then(response => {
                console.log(response.data);
                this.setState({ jobs: response.data, sortedUsers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangemax_applications(e) {
        this.setState({
            max_applications: e.target.value
        });
    }

    onChangemax_positions(e) {
        this.setState({
            max_positions: e.target.value
        });
    }

    onChangedeadline(e) {
        this.setState({
            deadline: e.target.value
        });
    }

    async deletejob(id) {

        // console.log(id);
        await axios.delete('http://localhost:5000/job/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })

        await axios.delete('http://localhost:5000/application/jobgone/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })

        this.componentDidMount();
    }

    async editjob(id) {
        // console.log(id);
        // console.log(this.state.max_applications);
        // console.log(this.state.max_positions);
        // console.log(this.state.deadline);

        var jbat;

        await axios.get('http://localhost:5000/job/getbyid/' + id)
            .then(response => {
                jbat = response.data;
            });

        console.log(jbat.max_positions);
        console.log(this.state.max_positions);

        ///////////////////////////////////////////////////////////

        if (Number.isInteger(Number(this.state.max_applications)) === false || Number(this.state.max_applications) <= 0) {
            alert("Max applications must be positive integer");
        }

        else if (Number.isInteger(Number(this.state.max_positions)) === false || Number(this.state.max_positions) <= 0) {
            alert("Max positions must be positive integer");
        }

        ////////////////////////////////////////////////////////////

        else if (this.state.max_applications >= jbat.curr_applications && this.state.max_positions >= jbat.curr_positions) {

            jbat.max_applications = this.state.max_applications;
            jbat.max_positions = this.state.max_positions;
            jbat.deadline = this.state.deadline;
            jbat.rem_positions = jbat.max_positions - jbat.curr_positions;

            await axios.post('http://localhost:5000/job/update/' + id, jbat)
                .then(res => (console.log(res.data)));

            /////////////////////// CODE TO REJECT APPLICATIONs ////////////////////////////

            if (jbat.rem_positions == 0) {

                await axios.get('http://localhost:5000/application/perjob/' + id)
                    .then(response => {
                        var rapp = response.data;

                        for (var i = 0; i < rapp.length; i++) {

                            if (rapp[i].status != 'Accepted') {
                                var rejap = rapp[i];
                                rejap.status = 'Rejected';

                                axios.post('http://localhost:5000/application/updatebyid/' + rejap._id, rejap)
                                    .then(response => {
                                        console.log(response.data);
                                    });
                            }
                        }
                    });
            }

            /////////////////////////////////////////////////////////////////////////////////

            this.componentDidMount();
        }

        else {
            alert("New maximum can't be lesser than current value");
        }
    }

    async perjob(id) {

        localStorage.setItem("job_id", id);           // setting in local storage
        window.location = "/recruiter/perjob";
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
                <Grid container>
                    <Grid item xs={12} md={3} lg={2}>
                        <List component="nav" aria-label="mailbox folders">
                            <br></br>
                            <div className="form-group">
                                <label>Max Applicants: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.max_applications}
                                    onChange={this.onChangemax_applications}
                                    style={{
                                        width: "150px",
                                    }}
                                />
                            </div>
                            <br></br>
                            <Divider />
                            <br></br>
                            <div className="form-group">
                                <label>Max Positions: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.max_positions}
                                    onChange={this.onChangemax_positions}
                                    style={{
                                        width: "150px",
                                    }}
                                />
                            </div>
                            <br></br>
                            <Divider />
                            <br></br>
                            <div className="form-group">
                                <TextField
                                    id="deadline"
                                    type="datetime-local"

                                    value={this.state.deadline}
                                    onChange={this.onChangedeadline}
                                    style={{
                                        width: "180px",
                                    }}
                                />
                            </div>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date of Posting</TableCell>
                                        <TableCell>Rem Positions</TableCell>
                                        <TableCell>Max Applicants</TableCell>
                                        <TableCell>Max Positions</TableCell>
                                        <TableCell>Deadline</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                        <TableCell>Applications</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.postingdate.split('T')[0]} {job.postingdate.split("T")[1].split(".")[0]}</TableCell>
                                            <TableCell>{job.rem_positions}</TableCell>
                                            <TableCell>{job.max_applications}</TableCell>
                                            <TableCell>{job.max_positions}</TableCell>
                                            <TableCell>{job.deadline.split('T')[0]} {job.deadline.split("T")[1].split(".")[0]}</TableCell>
                                            <TableCell><button
                                                onClick={() => this.editjob(job._id)}
                                                style={{
                                                    width: "70px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: '#00DBED'
                                                }}
                                                className="btn"
                                            >
                                                Edit
                                            </button></TableCell>
                                            <TableCell><button
                                                onClick={() => this.deletejob(job._id)}
                                                style={{
                                                    width: "75px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: '#F15959'
                                                }}
                                                className="btn"
                                            >
                                                Delete
                                            </button></TableCell>
                                            <TableCell><button
                                                onClick={() => this.perjob(job._id)}
                                                style={{
                                                    width: "75px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: '#82FF57'
                                                }}
                                                className="btn"
                                            >
                                                Check
                                            </button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}