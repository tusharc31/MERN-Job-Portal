import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Fuse from 'fuse.js';
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


export default class applicantapplications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            sortedUsers: [],
            sortName: true,
            title: [],
            name: [],
            salary: [],
            rating: []
        };

        this.apply = this.apply.bind(this);

    }

    async componentDidMount() {

        var us = localStorage.getItem("user");
        console.log(us);

        await axios.get('http://localhost:5000/application/' + us)
            .then(response => {
                this.setState({ applications: response.data, sortedUsers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        var tit = [];
        var nam = [];
        var sal = [];
        var rat = [];

        // console.log(this.state.applications);

        for (var i = 0; i < this.state.applications.length; i++) {
            await axios.get('http://localhost:5000/job/getbyid/' + this.state.applications[i].jobid)
                .then(response => {
                    tit.push(response.data.title);
                    nam.push(response.data.recruitername);
                    sal.push(response.data.salary);
                    rat.push(response.data.rating);
                })
        }

        // console.log(tit);
        // console.log(nam);
        // console.log(sal);

        await this.setState({
            title: tit,
            name: nam,
            salary: sal,
            rating: rat
        })

        console.log(this.state.rating);
    }

    async apply(id, sta, appaji, che) {

        console.log("Ok");
        var rat;

        if (sta === 'Accepted') {

            if (che == 0) {
                var rat = prompt('Enter a rating (0-5)');

                if (rat === null) alert('invalid rating')

                else if (rat.length === 0) alert('invalid rating')

                else if (isNaN(rat) == true || rat < 0 || rat > 5) alert('Invalid rating')

                else {

                    var atbu, jtbu;

                    await axios.get('http://localhost:5000/application/byid/' + appaji)
                        .then(response => {
                            console.log(response.data);
                            atbu = response.data;
                            atbu.hasapplicant = 1;
                            console.log(atbu);
                        })

                    await axios.post('http://localhost:5000/application/updatebyid/' + appaji, atbu)
                        .then(res => (console.log(res.data)));

                    await axios.get('http://localhost:5000/job/getbyid/' + id)
                        .then(response => {
                            // console.log(response.data);
                            jtbu = response.data;
                            jtbu.ratingsum = Number(jtbu.ratingsum) + Number(rat);
                            jtbu.ratingtimes = Number(jtbu.ratingtimes) + Number(1);
                            jtbu.rating = Number(jtbu.ratingsum) / Number(jtbu.ratingtimes);
                            // console.log(jtbu);

                        })

                    await axios.post('http://localhost:5000/job/update/' + id, jtbu)
                        .then(res => (console.log(res.data)));

                    this.componentDidMount();
                }
            }
            else {
                alert('You have already rated this job!');
            }
        }

        else
            alert("You can't rate this job!");
    }

    render() {
        return (
            <div className="container">
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
                    <br></br>
                </div>
                <div>
                    <Grid container>
                        <Grid item xs={12} md={9} lg={12}>
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell> */}
                                            <TableCell>Title</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell>Rate</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.applications.map((application, ind) => (
                                            <TableRow key={ind}>
                                                <TableCell>{this.state.title[ind]}</TableCell>
                                                <TableCell>{this.state.name[ind]}</TableCell>
                                                <TableCell>{this.state.salary[ind]}</TableCell>
                                                <TableCell>{application.dateofjoining.split('T')[0]}<br></br>{application.dateofjoining.split("T")[1].split(".")[0]}</TableCell>
                                                <TableCell>{application.status}</TableCell>
                                                <TableCell>{Number(this.state.rating[ind]).toFixed(2)}</TableCell>
                                                <TableCell><button
                                                    onClick={() => this.apply(application.jobid, application.status, application._id, application.hasapplicant)}
                                                    style={{
                                                        width: "60px",
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
            </div>
        )
    }
}
