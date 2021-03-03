import React from "react";
import "./MenuBar.css"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Menubar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="/">Recess</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/Calendar" hidden={sessionStorage.getItem("accessToken") === null ? true : false}>Calendar</Nav.Link>
                        <Nav.Link href="/CreateEvent" hidden={sessionStorage.getItem("role") !== "Teacher" ? true : false}>New Class</Nav.Link>
                        <Nav.Link href="/CreateRoster" hidden={sessionStorage.getItem("role") !== "Teacher" ? true : false}>New Roster</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/Profile" hidden={sessionStorage.getItem("accessToken") === null ? true : false}>Profile</Nav.Link>
                        <Nav.Link href="/ChangePassword" hidden={sessionStorage.getItem("accessToken") === null ? true : false}>Change Password</Nav.Link>
                        <Nav.Link href="/login" hidden={sessionStorage.getItem("accessToken") === null ? false : true} >Login</Nav.Link>
                        <Nav.Link href="/Logout" hidden={sessionStorage.getItem("accessToken") === null ? true : false} >Logout</Nav.Link>
                        <Nav.Link href="/CreateAccount" hidden={sessionStorage.getItem("accessToken") === null ? false : true} >Create Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menubar;