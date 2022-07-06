import React, { Component } from 'react';


export default class logout extends Component {

    componentDidMount() {
        localStorage.setItem("key", "-1");
        window.location="/";
    }

    render() {
        return (
            <div className="container">
                <div>
                    <p>Loging out ...!</p>
                </div>
            </div>
        )
    }
}