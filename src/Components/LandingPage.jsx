import React, { Component } from "react";
import "./LandingPage.css";


// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Menubar from "./MenuBar";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Menubar />
                <Container className=" background_LP " fluid>
                </Container>
            </div>
        );
    }
}

export default LandingPage;