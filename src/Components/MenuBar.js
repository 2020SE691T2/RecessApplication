import React from "react";
import "./MenuBar.css"

class Menubar extends React.Component {
    render() {
        return (
            <div className="menuBar">
                <ul id="bar">
                    <li className="leftAlign"><a href="/">Home</a></li>
                    <li className="leftAlign"><a href="/">About</a></li>
                    <li className="leftAlign"><a href="/Profile">Profile</a></li>
                    <li className="rightAlign"><a href="/login">Log In</a></li>
                    <li className="rightAlign"><a href="/CreateAccount">Create Account</a></li>
                </ul>
            </div>
        );
    }
}

export default Menubar;