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

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            filteredjobs: [],
            sortedUsers: [],
            sortsalary: true,
            sortduration: true,
            sortdeadline: true,
            jobtypes: [],
            jobtype: '',
            maxdurations: [],
            maxduration: '',
            minsalary: 0,
            maxsalary: 9999999999,
            search: '',
        };

        this.renderIcon1 = this.renderIcon1.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.sortChange1 = this.sortChange1.bind(this);
        this.sortChange2 = this.sortChange2.bind(this);
        this.sortChange3 = this.sortChange3.bind(this);
        this.apply = this.apply.bind(this);

        this.onChangejobtype = this.onChangejobtype.bind(this);
        this.onChangemaxduration = this.onChangemaxduration.bind(this);

        this.onChangeminsalary = this.onChangeminsalary.bind(this);
        this.onChangemaxsalary = this.onChangemaxsalary.bind(this);

        this.onChangesearch = this.onChangesearch.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/job/')
            .then(response => {
                // console.log(response.data);
                this.setState({ jobs: response.data, sortedUsers: response.data, filteredjobs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        // console.log(this.state.jobs[0]._id);


        var us = localStorage.getItem("user");
        // console.log(us);
        var suyashmc = [];
        var vardhanmc = [];

        for (var i = 0; i < this.state.jobs.length; i++) {
            await axios.get('http://localhost:5000/application/forjob/' + us + '/' + this.state.jobs[i]._id)
                .then(response => {
                    if (response.data.length > 0) {
                        suyashmc.push(response.data[0].status);
                        vardhanmc.push('#82FF57');
                    }
                    else {
                        suyashmc.push('Apply');
                        vardhanmc.push('#00DBED');
                    }

                    if (suyashmc[i] === 'Apply' && (this.state.jobs[i].curr_positions >= this.state.jobs[i].max_positions || this.state.jobs[i].curr_applications >= this.state.jobs[i].max_applications)) {
                        suyashmc[i] = 'Full';
                        vardhanmc[i] = '#F15959';
                    }

                    if (suyashmc[i] === 'Rejected') {
                        vardhanmc[i] = '#F15959';
                    }
                })
        }

        var xo = this.state.jobs;

        for (var i = 0; i < this.state.jobs.length; i++) {
            xo[i].status = suyashmc[i];
            xo[i].color = vardhanmc[i];
        }

        await this.setState({
            jobtypes: ['All', 'Full-time', 'Part-time', 'Work from home'],
            jobtype: 'All',
            maxdurations: ['1', '2', '3', '4', '5', '6', '7'],
            maxduration: '7',
            minsalary: 0,
            maxsalary: 9999999999,
            jobs: xo
        })

        // this.setState({
        //     jobs: suyashmc
        // })
        // console.log("suyash gay");
        // console.log(this.state.jobs);
    }

    async onChangejobtype(e) {
        await this.setState({
            jobtype: e.target.value,
            search: ''
        });

        var filteredJobs = [];
        for (var i = 0; i < this.state.filteredjobs.length; i++) {
            if ((Number(this.state.filteredjobs[i].duration) < Number(this.state.maxduration)) && (this.state.filteredjobs[i].jobtype === this.state.jobtype || this.state.jobtype === 'All') && (Number(this.state.filteredjobs[i].salary) >= Number(this.state.minsalary)) && (Number(this.state.filteredjobs[i].salary) <= Number(this.state.maxsalary))) {
                filteredJobs.push(this.state.filteredjobs[i]);
            }
        }

        var array = filteredJobs;
        // console.log(filteredJobs);

        this.setState({
            jobs: array,
        })
    };

    async onChangemaxduration(e) {
        await this.setState({
            maxduration: e.target.value,
            search: ''
        });

        var filteredJobs = [];
        for (var i = 0; i < this.state.filteredjobs.length; i++) {
            if ((Number(this.state.filteredjobs[i].duration) < Number(this.state.maxduration)) && (this.state.filteredjobs[i].jobtype === this.state.jobtype || this.state.jobtype === 'All') && (Number(this.state.filteredjobs[i].salary) >= Number(this.state.minsalary)) && (Number(this.state.filteredjobs[i].salary) <= Number(this.state.maxsalary))) {
                filteredJobs.push(this.state.filteredjobs[i]);
            }
        }

        var array = filteredJobs;
        // console.log(filteredJobs);

        this.setState({
            jobs: array,
        })
    };

    async onChangeminsalary(e) {
        await this.setState({
            minsalary: e.target.value,
            search: ''
        });

        if (isNaN(this.state.minsalary) == true) console.log("error");

        var filteredJobs = [];
        for (var i = 0; i < this.state.filteredjobs.length; i++) {
            if ((Number(this.state.filteredjobs[i].duration) < Number(this.state.maxduration)) && (this.state.filteredjobs[i].jobtype === this.state.jobtype || this.state.jobtype === 'All') && (Number(this.state.filteredjobs[i].salary) >= Number(this.state.minsalary)) && (Number(this.state.filteredjobs[i].salary) <= Number(this.state.maxsalary))) {
                filteredJobs.push(this.state.filteredjobs[i]);
            }
        }

        var array = filteredJobs;
        // console.log(filteredJobs);

        this.setState({
            jobs: array,
        })
    };

    async onChangemaxsalary(e) {
        await this.setState({
            maxsalary: e.target.value,
            search: ''
        });

        if (isNaN(this.state.maxsalary) == true) console.log("error");

        var filteredJobs = [];
        for (var i = 0; i < this.state.filteredjobs.length; i++) {
            if ((Number(this.state.filteredjobs[i].duration) < Number(this.state.maxduration)) && (this.state.filteredjobs[i].jobtype === this.state.jobtype || this.state.jobtype === 'All') && (Number(this.state.filteredjobs[i].salary) >= Number(this.state.minsalary)) && (Number(this.state.filteredjobs[i].salary) <= Number(this.state.maxsalary))) {
                filteredJobs.push(this.state.filteredjobs[i]);
            }
        }

        var array = filteredJobs;
        // console.log(filteredJobs);

        this.setState({
            jobs: array,
        })
    };

    async onChangesearch(e) {
        await this.setState({
            search: e.target.value
        });

        if (this.state.search.length == 0) {
            this.setState({
                jobs: this.state.filteredjobs,
                maxduration: 7,
                maxsalary: 9999999999,
                minsalary: 0,
                jobtype: 'All'
            })
        }

        else {
            const fuse = new Fuse(this.state.jobs, {
                keys: [
                    'title'
                ],
                includeScore: true
            })

            console.log('fuse', fuse)
            const results = fuse.search(this.state.search);
            console.log(results);

            this.setState({
                jobs: results.map(result => result.item)
            })
        }
    };

    sortChange1() {
        var array = this.state.jobs;
        var flag = this.state.sortsalary;
        array.sort(function (a, b) {
            if (a.salary != undefined && b.salary != undefined) {
                return (1 - flag * 2) * ((a.salary) - (b.salary));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortsalary: !this.state.sortsalary,
        })
    }

    sortChange2() {
        var array = this.state.jobs;
        var flag = this.state.sortduration;
        array.sort(function (a, b) {
            if (a.duration != undefined && b.duration != undefined) {
                return (1 - flag * 2) * ((a.duration) - (b.duration));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortduration: !this.state.sortduration,
        })
    }

    sortChange3() {
        var array = this.state.jobs;
        var flag = this.state.sortdeadline;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * ((a.rating) - (b.rating));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortdeadline: !this.state.sortdeadline,
        })
    }

    async apply(id, sta) {

        var us = localStorage.getItem("user");
        var apd = 0;
        var apddd = 0;

        if (sta === 'Apply') {

            await axios.get('http://localhost:5000/application/' + us)
                .then(response => {
                    for (var k = 0; k < response.data.length; k++) {
                        if (response.data[k].status === 'Applied' || response.data[k].status === 'Shortlisted') {
                            apd++;
                        }
                        if (response.data[k].status === 'Accepted') {
                            apddd++;
                        }
                    }
                })

            if (apd < 10 && apddd === 0) {

                var jbat = [];

                await axios.get('http://localhost:5000/job/getbyid/' + id)
                    .then(response => {
                        jbat = response.data;
                    });

                jbat.curr_applications = jbat.curr_applications + 1;


                var sop1 = prompt('Enter statement of purpose :');

                if (sop1 !== null && sop1.length > 0 && sop1.split(" ").length <= 250) {

                    const application = {
                        jobid: id,
                        recruiteremailid: jbat.recruiterid,
                        applicantemailid: us,
                        sop: sop1,
                        status: 'Applied',
                        dateofapplication: Date.now(),
                        dateofjoining: '0000-01-01T00:00:00.173Z',
                        name_forrec: '',
                        skills_forrec: '',
                        institutename_forrec: '',
                        start_forrec: '',
                        end_forrec: '',
                        rating_forrec: 0,
                        button_forrec: '',
                        hasrecruiter: 0,
                        hasapplicant: 0
                    }

                    console.log(application);

                    await axios.post('http://localhost:5000/application/add/', application)
                        .then(res => console.log(res.data));

                    await axios.post('http://localhost:5000/job/update/' + id, jbat)
                        .then(res => (console.log(res.data)));

                    this.componentDidMount();
                }

                else {
                    alert("SOP must be between 1 to 250 characters!");
                }
            }

            else {
                alert("You can't apply anymore!");
            }
        }
    }

    renderIcon1() {
        if (this.state.sortsalary) {
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
        if (this.state.sortduration) {
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
        if (this.state.sortdeadline) {
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

    render() {
        return (
            <div>

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

                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h3>Filters</h3>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <div className="form-group">
                            <label>Search: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.search}
                                onChange={this.onChangesearch}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <div className="form-group">
                                    <label>Min Salary </label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.minsalary}
                                        onChange={this.onChangeminsalary}
                                    />
                                </div>
                                <br></br>
                                <Divider />
                                <div className="form-group">
                                    <label>Max Salary </label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.maxsalary}
                                        onChange={this.onChangemaxsalary}
                                    />
                                </div>
                            </ListItem>
                            <br></br>
                            <Divider />
                            <br></br>
                            <div className="form-group">
                                <label>Job Type</label>
                                <select ref="userInput"
                                    required
                                    style={{ "width": "90%" }}
                                    className="form-control"
                                    value={this.state.jobtype}
                                    onChange={this.onChangejobtype}>
                                    {
                                        this.state.jobtypes.map(function (jobtype) {
                                            return <option
                                                key={jobtype}
                                                value={jobtype}>{jobtype}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <br></br>
                            <Divider />
                            <br></br>
                            <div className="form-group">
                                <label>Duration less than:</label>
                                <select ref="userInput"
                                    required
                                    style={{ "width": "90%" }}
                                    className="form-control"
                                    value={this.state.maxduration}
                                    onChange={this.onChangemaxduration}>
                                    {
                                        this.state.maxdurations.map(function (maxduration) {
                                            return <option
                                                key={maxduration}
                                                value={maxduration}>{maxduration}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <br></br>
                            <Divider />
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Recruiter Name</TableCell>
                                        <TableCell> <Button onClick={this.sortChange3}>{this.renderIcon3()}</Button>Rating</TableCell>
                                        {/* <TableCell>Job Rating</TableCell> */}
                                        <TableCell> <Button onClick={this.sortChange1}>{this.renderIcon1()}</Button>Salary</TableCell>
                                        {/* <TableCell>Salary</TableCell> */}
                                        <TableCell> <Button onClick={this.sortChange2}>{this.renderIcon2()}</Button>Duration</TableCell>
                                        <TableCell>Deadline</TableCell>
                                        {/* <TableCell>Deadline</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.recruitername}</TableCell>
                                            <TableCell>{Number(job.rating).toFixed(2)}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.deadline.split('T')[0]} {job.deadline.split("T")[1].split(".")[0]}</TableCell>
                                            <TableCell><button
                                                onClick={() => this.apply(job._id, job.status)}
                                                style={{
                                                    width: "105px",
                                                    borderRadius: "1.5px",
                                                    letterSpacing: ".75px",
                                                    backgroundColor: job.color
                                                }}
                                                className="btn"
                                            >
                                                {job.status}
                                            </button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

// export default UsersList;