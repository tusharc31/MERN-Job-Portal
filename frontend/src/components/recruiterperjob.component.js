import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'
import "bootstrap/dist/css/bootstrap.min.css";

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

export default class ApplicationsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applications: [],
            sortedApplications: [],
            sortname: true,
            sortdate: true,
            sortrating: true
        };

        this.renderIcon1 = this.renderIcon1.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.sortChange1 = this.sortChange1.bind(this);
        this.sortChange2 = this.sortChange2.bind(this);
        this.sortChange3 = this.sortChange3.bind(this);

        this.youarein = this.youarein.bind(this);
        this.youareout = this.youareout.bind(this);

    }

    async componentDidMount() {

        var us = localStorage.getItem("job_id");
        console.log(us);

        await axios.get('http://localhost:5000/application/perjob/' + us)
            .then(response => {
                this.setState({ applications: response.data, sortedApplications: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        var nam = [];
        var ski = [];
        var ins = [];
        var sta = [];
        var end = [];
        var rat = [];
        var but = [];

        for (var i = 0; i < this.state.applications.length; i++) {
            await axios.get('http://localhost:5000/applicant/' + this.state.applications[i].applicantemailid)
                .then(response => {
                    // console.log(i);
                    // console.log(response.data[0]);
                    nam.push(response.data[0].name);
                    ski.push(response.data[0].skills);
                    ins.push(response.data[0].institutename);
                    sta.push(response.data[0].startyear);
                    end.push(response.data[0].endyear);
                    rat.push(response.data[0].rating);

                    if (this.state.applications[i].status === 'Applied')
                        but.push('Shortlist');

                    if (this.state.applications[i].status === 'Shortlisted')
                        but.push('Accept');

                    if (this.state.applications[i].status === 'Accepted')
                        but.push('Accepted');
                })
        }

        var xo = this.state.applications;

        for (var i = 0; i < this.state.applications.length; i++) {
            xo[i].name_forrec = nam[i];
            xo[i].skills_forrec = ski[i];
            xo[i].institutename_forrec = ins[i];
            xo[i].start_forrec = sta[i];
            xo[i].end_forrec = end[i];
            xo[i].rating_forrec = rat[i];
            xo[i].button_forrec = but[i];
        }

        await this.setState({
            applications: xo
        })
    }

    sortChange1() {
        // console.log("aosdiaoskjdnaksd");
        var array = this.state.applications;
        var flag = this.state.sortname;
        array.sort(function (a, b) {
            if (a.name_forrec != undefined && b.name_forrec != undefined) {
                var str1 = a.name_forrec;
                var str2 = b.name_forrec;
                var n = str1.localeCompare(str2);
                return (1 - flag * 2) * n;
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortname: !this.state.sortname,
        })
    }

    sortChange2() {
        var array = this.state.applications;
        var flag = this.state.sortdate;
        array.sort(function (a, b) {
            if (a.dateofapplication != undefined && b.dateofapplication != undefined) {
                return (1 - flag * 2) * (new Date(a.dateofapplication) - new Date(b.dateofapplication));
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortdate: !this.state.sortdate,
        })
    }

    sortChange3() {
        var array = this.state.applications;
        var flag = this.state.sortrating;
        array.sort(function (a, b) {
            if (a.rating_forrec != undefined && b.rating_forrec != undefined) {
                return (1 - flag * 2) * ((a.rating_forrec) - (b.rating_forrec));
                // return (1 - flag * 2) * (new Date(a.rating_forrec) - new Date(b.rating_forrec));
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sortrating: !this.state.sortrating,
        })
    }

    renderIcon1() {
        if (this.state.sortname) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    renderIcon2() {
        if (this.state.sortdate) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    renderIcon3() {
        if (this.state.sortrating) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    async youarein(id, sta) {

        if (sta === 'Accepted') {
            alert('This applcant is already accepted!');
        }

        else {
            console.log(id);
            var atbu, jid;

            await axios.get('http://localhost:5000/application/byid/' + id)
                .then(response => {
                    // console.log(response.data);
                    atbu = response.data;
                    jid = atbu.jobid;
                })
                .catch(function (error) {
                    console.log(error);
                })

            if (atbu.status === 'Shortlisted') {

                atbu.status = 'Accepted';
                atbu.dateofjoining = Date.now();

                var jbat = [];

                await axios.get('http://localhost:5000/job/getbyid/' + jid)
                    .then(response => {
                        jbat = response.data;
                    });

                // jbat.curr_applications = jbat.curr_applications - 1;
                jbat.curr_positions = jbat.curr_positions + 1;
                jbat.rem_positions = jbat.rem_positions - 1;

                await axios.post('http://localhost:5000/job/update/' + jid, jbat)
                    .then(res => (console.log(res.data)));

                /////////////////////////////////// EMAIL ON ACCEPTANCE ///////////////////////////

                axios.get('http://localhost:5000/application/confirmation/' + atbu.applicantemailid + '/' + jbat.recruitername)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                ////////////////////////////////////////////////////////////////////////////////////

                //////////////////////////////////// Rejecting all other ///////////////////////////

                await axios.get('http://localhost:5000/application/' + atbu.applicantemailid)
                    .then(response => {
                        var rapp = response.data;

                        for (var i = 0; i < rapp.length; i++) {

                            if (rapp[i]._id != id) {
                                var rejap = rapp[i];
                                rejap.status = 'Rejected';

                                axios.post('http://localhost:5000/application/updatebyid/' + rejap._id, rejap)
                                    .then(response => {
                                        console.log(response.data);
                                    });
                            }
                        }
                    });

                if (jbat.rem_positions == 0) {

                    await axios.get('http://localhost:5000/application/perjob/' + atbu.jobid)
                        .then(response => {
                            var rapp = response.data;

                            for (var i = 0; i < rapp.length; i++) {

                                if (rapp[i]._id != id && rapp[i].status!='Accepted') {
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

                ////////////////////////////////////////////////////////////////////////////////////
            }

            if (atbu.status === 'Applied') {
                atbu.status = 'Shortlisted';
            }

            await axios.post('http://localhost:5000/application/updatebyid/' + id, atbu)
                .then(response => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })



            this.componentDidMount();
        }
    }

    async youareout(id, sta) {

        if (sta === 'Accepted') {
            alert('This applcant is already accepted!');
        }

        else {

            var atbu, jbat, jid;

            await axios.get('http://localhost:5000/application/byid/' + id)
                .then(response => {
                    // console.log(response.data);
                    atbu = response.data;
                    jid = atbu.jobid;
                })
                .catch(function (error) {
                    console.log(error);
                })

            atbu.status = 'Rejected';

            await axios.post('http://localhost:5000/application/updatebyid/' + id, atbu)
                .then(response => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })

            await axios.get('http://localhost:5000/job/getbyid/' + jid)
                .then(response => {
                    jbat = response.data;
                });

            // jbat.curr_applications = jbat.curr_applications - 1;

            await axios.post('http://localhost:5000/job/update/' + jid, jbat)
                .then(res => (console.log(res.data)));

            this.componentDidMount();
        }
    }

    render() {
        return (
            <div>
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
                <Grid container className="white">
                    <Grid item xs={12} md={9} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> <Button onClick={this.sortChange1}>{this.renderIcon1()}</Button>Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell> <Button onClick={this.sortChange2}>{this.renderIcon2()}</Button>Apply date</TableCell>
                                        <TableCell>Institute</TableCell>
                                        <TableCell>Start</TableCell>
                                        <TableCell>End</TableCell>
                                        <TableCell>SOP</TableCell>
                                        <TableCell> <Button onClick={this.sortChange3}>{this.renderIcon3()}</Button>Rating</TableCell>
                                        <TableCell>Stage</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((application, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{application.name_forrec}</TableCell>
                                            <TableCell>{application.skills_forrec}</TableCell>
                                            <TableCell>{application.dateofapplication.split("T")[0]}<br></br>{application.dateofapplication.split("T")[1].split(".")[0]} </TableCell>
                                            <TableCell>{application.institutename_forrec}</TableCell>
                                            <TableCell>{application.start_forrec}</TableCell>
                                            <TableCell>{application.end_forrec}</TableCell>
                                            <TableCell>{application.sop}</TableCell>
                                            <TableCell>{Number(application.rating_forrec).toFixed(2)}</TableCell>
                                            <TableCell>{application.status}</TableCell>
                                            <TableCell><button
                                                onClick={() => this.youarein(application._id, application.status)}
                                                style={{
                                                    width: "95px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: "#82FF57"
                                                }}
                                                className="btn"
                                            >
                                                {application.button_forrec}
                                            </button></TableCell>
                                            <TableCell><button
                                                onClick={() => this.youareout(application._id, application.status)}
                                                style={{
                                                    width: "80px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: '#F15959'
                                                }}
                                                className="btn"
                                            >
                                                Reject
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