import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

// import Navbar from "./components/navbar.component"
import signIn from "./components/signin.component";
import signUpApplicant from "./components/signupapplicant.component";
import signUpRecruiter from "./components/signuprecruiter.component";
// import applicant from "./components/applicant.component";
// import recruiter from "./components/recruiter.component";
import error from "./components/error.component";

import applicantprofile from "./components/applicantprofile.component";
import applicantedit from "./components/applicantedit.component";
import applicantjobs from "./components/applicantjobs.component";
import applicantapplications from "./components/applicantapplications.component";
import applicantupload from "./components/applicantupload.component";

import recruiterprofile from "./components/recruiterprofile.component";
import recruiteredit from "./components/recruiteredit.component";
import recruitercreatejob from "./components/recruitercreatejob.component";
import recruitermyjob from "./components/recruitermyjob.component";
import recruiteremployees from "./components/recruiteremployees.component";
import recruiterperjob from "./components/recruiterperjob.component";

import logout from "./components/logout.component";

// import 'App.css';

function App() {
  return (
    <Router>
      <div className="container">
      {/* <Navbar /> */}
      <br/>
      <Route path="/" exact component={signIn} />
      <Route path="/signUpApplicant" component={signUpApplicant} />
      <Route path="/signUpRecruiter" component={signUpRecruiter} />
      {/* <Route path="/applicant" component={applicant} /> */}
      {/* <Route path="/recruiter" component={recruiter} /> */}
      <Route path="/error" component={error} />

      <Route path="/applicant/profile" component={applicantprofile} />
      <Route path="/applicant/edit" component={applicantedit} />
      <Route path="/applicant/jobs" component={applicantjobs} />
      <Route path="/applicant/applications" component={applicantapplications} />
      <Route path="/applicant/upload" component={applicantupload} />

      <Route path="/recruiter/profile" component={recruiterprofile} />
      <Route path="/recruiter/edit" component={recruiteredit} />
      <Route path="/recruiter/createjob" component={recruitercreatejob} />
      <Route path="/recruiter/myjob" component={recruitermyjob} />
      <Route path="/recruiter/employees" component={recruiteremployees} />

      <Route path="/recruiter/perjob" component={recruiterperjob} />

      <Route path="/logout" component={logout} />
      </div>
    </Router>
  );
}

export default App;
