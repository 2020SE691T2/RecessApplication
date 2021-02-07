import React from "react";
import "./MenuBar.css"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Environment from "./Environment";

class Menubar extends React.Component {
    isStudentOrParent = true;
    env;
    constructor() {
        super();
        this.env = new Environment();
    }

    componentDidMount() {
        var url = this.env.getRootUrl() + "/users/" + sessionStorage.getItem("email");
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            })
        })
            .then((resp) => resp.json())
            .then((results) => {
                if (results.role) {
                    if (results.role === "Teacher") {
                        this.isStudentOrParent = false;
                    }
                    else {
                        this.isStudentOrParent = true;
                    }
                }
            });
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="/">Recess</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#">About</Nav.Link>
                        <NavDropdown title="Events" id="basic-nav-dropdown" hidden={sessionStorage.getItem("accessToken") === null ? true : false} >
                            <NavDropdown.Item href="/CreateEvent" hidden={this.isStudentOrParent}>Create Event</NavDropdown.Item>
                            <NavDropdown.Item href="/Calendar">Calendar</NavDropdown.Item>
                        </NavDropdown>
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