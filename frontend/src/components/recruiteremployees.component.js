import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        this.state = {
            applications: [],
            sortedUsers: [],
            sortname: true,
            sortrating: true,
            sortdate: true,
            sorttitle: true
        };
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.renderIcon4 = this.renderIcon4.bind(this);
        this.sortChange1 = this.sortChange1.bind(this);
        this.sortChange2 = this.sortChange2.bind(this);
        this.sortChange3 = this.sortChange3.bind(this);
        this.sortChange4 = this.sortChange4.bind(this);
        this.rateapplicant = this.rateapplicant.bind(this);
    }

    async componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        await axios.get('http://localhost:5000/application/employees/' + us)
            .then(response => {
                console.log(response.data);
                this.setState({ applications: response.data, sortedApplications: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        var nam = [];
        var rat = [];
        var typ = [];
        var tit = [];


        for (var i = 0; i < this.state.applications.length; i++) {
            await axios.get('http://localhost:5000/job/getbyid/' + this.state.applications[i].jobid)
                .then(response => {
                    // console.log(i);
                    // console.log(response.data[0]);
                    tit.push(response.data.title);
                    typ.push(response.data.jobtype);
                })

            await axios.get('http://localhost:5000/applicant/' + this.state.applications[i].applicantemailid)
                .then(response => {
                    // console.log(i);
                    // console.log(response.data[0]);
                    nam.push(response.data[0].name);
                    rat.push(response.data[0].rating);
                })
        }

        var xo = this.state.applications;

        for (var i = 0; i < this.state.applications.length; i++) {
            xo[i].name_forrec = nam[i];
            xo[i].rating_forrec = rat[i];
            xo[i].start_forrec = typ[i];
            xo[i].end_forrec = tit[i];
        }

        await this.setState({
            applications: xo
        })
    }

    sortChange1() {
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
            if (a.dateofjoining != undefined && b.dateofjoining != undefined) {
                return (1 - flag * 2) * (new Date(a.dateofjoining) - new Date(b.dateofjoining));
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
        var flag = this.state.sorttitle;
        array.sort(function (a, b) {
            if (a.end_forrec != undefined && b.end_forrec != undefined) {
                var str1 = a.end_forrec;
                var str2 = b.end_forrec;
                var n = str1.localeCompare(str2);
                return (1 - flag * 2) * n;
            }
            else {
                return 1;
            }
        });
        this.setState({
            applications: array,
            sorttitle: !this.state.sorttitle,
        })
    }

    sortChange4() {
        var array = this.state.applications;
        var flag = this.state.sortrating;
        array.sort(function (a, b) {
            if (a.rating_forrec != undefined && b.rating_forrec != undefined) {
                return (1 - flag * 2) * ((a.rating_forrec) - (b.rating_forrec));
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
        if (this.state.sorttitle) {
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

    renderIcon4() {
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

    async rateapplicant(id, che, appaji) {
        console.log(id);

        if (che == 1) {
            alert('You have already rated this employee!');
        }

        else {
            var rat = prompt('Enter a rating (0-5)');

            if (rat === null) alert('invalid rating')
            else if (rat.length === 0) alert('invalid rating')
            else if (isNaN(rat) == true || rat < 0 || rat > 5) alert('Invalid rating');

            else {
                var atbu, jtbu;

                await axios.get('http://localhost:5000/application/byid/' + appaji)
                    .then(response => {
                        console.log(response.data);
                        atbu = response.data;
                        atbu.hasrecruiter = 1;
                        console.log(atbu);
                    })

                await axios.post('http://localhost:5000/application/updatebyid/' + appaji, atbu)
                    .then(res => (console.log(res.data)));

                await axios.get('http://localhost:5000/applicant/' + id)
                    .then(response => {
                        console.log(response.data);
                        jtbu = response.data[0];
                        jtbu.ratingsum = Number(jtbu.ratingsum) + Number(rat);
                        jtbu.ratingtimes = Number(jtbu.ratingtimes) + Number(1);
                        jtbu.rating = Number(jtbu.ratingsum) / Number(jtbu.ratingtimes);
                        console.log(jtbu);
                    })

                await axios.post('http://localhost:5000/applicant/update/' + id, jtbu)
                    .then(res => (console.log(res.data)));

                this.componentDidMount();
            }
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

                <Grid container>
                    <Grid item xs={12} md={9} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> <Button onClick={this.sortChange1}>{this.renderIcon1()}</Button>Name</TableCell>
                                        <TableCell> <Button onClick={this.sortChange2}>{this.renderIcon2()}</Button>Joining Date</TableCell>
                                        <TableCell>Job Type</TableCell>
                                        <TableCell> <Button onClick={this.sortChange3}>{this.renderIcon3()}</Button>Job Title</TableCell>
                                        <TableCell> <Button onClick={this.sortChange4}>{this.renderIcon4()}</Button>Emp rating</TableCell>
                                        <TableCell>Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((application, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{application.name_forrec}</TableCell>
                                            <TableCell>{application.dateofjoining.split('T')[0]}<br></br> {application.dateofjoining.split("T")[1].split(".")[0]}</TableCell>
                                            <TableCell>{application.start_forrec}</TableCell>
                                            <TableCell>{application.end_forrec}</TableCell>
                                            <TableCell>{Number(application.rating_forrec).toFixed(2)}</TableCell>
                                            <TableCell><button
                                                onClick={() => this.rateapplicant(application.applicantemailid, application.hasrecruiter, application._id)}
                                                style={{
                                                    width: "95px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: "#82FF57"
                                                }}
                                                className="btn"
                                            >
                                                Rate
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

// export default UsersList;