import React, { Component } from "react";
import "./NewCal.css";
import Menubar from "./MenuBar";
import CalDate from "./CalDate";
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class NewCal extends Component {

    env;
    constructor() {
        super();
        this.populatePageTitle = this.populatePageTitle.bind(this);
        this.env = new Environment();
    }

    populatePageTitle() {
        var url = this.env.getRootUrl() + "/users/" + sessionStorage.getItem("email");
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            })
        })
            .then((resp) => resp.json())
            .then((results) => {
                if (RefreshToken(results)) {
                    document.getElementById("pageTitle").innerText = results.first_name + "'s Weekly Class Calendar";
                }
                else {
                    toastr.error('Error', "Failed to get profile.\nPlease log in again.")
                }
            });
    }

    componentDidMount() {
        this.populatePageTitle();
    }

    render() {
        return (
            <div>
                <Menubar />
                <Container className="backgroundNewCal" fluid>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h2 id="pageTitle" />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <CalDate />
                        </Col>
                    </Row>
                    <div>
                        <p></p>
                    </div>
                    <Row className="justify-content-md-center">
                        <Col xs={2}>
                            <h3>Monday</h3>
                            <div className="box1">
                                <p>8:00 am - 10:00 am</p>
                                <h5> Classtime</h5>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3>Tuesday</h3>
                            <div className="box2">
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3>Wednesday</h3>
                            <div className="box3">
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3> Thursday</h3>
                            <div className="box4">
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3> Friday</h3>
                            <div className="box5">
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div>
        );
    }
}

export default NewCal;