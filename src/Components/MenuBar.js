import React, { Component } from "react";
import "./MenuBar.css"

class Menubar extends React.Component {
    render() {
        return (
            <div className="menuBar">
                <ul id="nav">
                    <left><a href="/">Home</a></left>
                    <left><a href="/">About</a></left>
                    <right><a href="/login">Log In</a></right>
                    <right><a href="/CreateAccount">Create Account</a></right>
                </ul>
            </div>
        );
    }
}

export default Menubar;