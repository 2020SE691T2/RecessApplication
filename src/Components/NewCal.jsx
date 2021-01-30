import React, { Component } from "react";
import "./NewCal.css";
import Menubar from "./MenuBar";
import CalDate from "./CalDate";
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
import CalendarEvent from "./CalendarEvent";
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class NewCal extends Component {

    env;
    mondayEvents = [];
    tuesdayEvents = [];
    wednesdayEvents = [];
    thursdayEvents = [];
    fridayEvents = [];
    constructor() {
        super();
        this.populatePageTitle = this.populatePageTitle.bind(this);
        this.getEventsFromDatabase = this.getEventsFromDatabase.bind(this);
        this.populateCalendar = this.populateCalendar.bind(this);
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

    getEventsFromDatabase(year, week) {
        var url = this.env.getRootUrl() + "/api/classes?year=" + year + "&week=" + week;
        fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            })
        })
            .then((resp) => resp.json())
            .then((results) => {
                //need to sort the events by day of week and the time
                results.schedules.forEach(event => {
                    switch (event.weekday.toLowerCase()) {
                        case "monday":
                            this.mondayEvents.push(event);
                            break;
                        case "tuesday":
                            this.tuesdayEvents.push(event);
                            break;
                        case "wednesday":
                            this.wednesdayEvents.push(event);
                            break;
                        case "thursday":
                            this.thursdayEvents.push(event);
                            break;
                        case "friday":
                            this.fridayEvents.push(event);
                            break;
                        default:

                    }
                });
                this.mondayEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
                this.tuesdayEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
                this.wednesdayEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
                this.thursdayEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
                this.fridayEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
            });
    }

    populateCalendar() {

    }

    componentDidMount() {
        this.populatePageTitle();
        this.getEventsFromDatabase(2021, 43);
        this.populateCalendar();
    }

    render() {
        return (
            <div>
                <Menubar />
                <Container className="backgroundNewCal" fluid>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h2 id="pageTitle"> </h2>
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
                                {
                                    this.wednesdayEvents.map(event => (
                                        <CalendarEvent startTime={event.start_time}
                                            endTime={event.end_time}
                                            link={event.meeting_link}
                                            className={event.class_name} />
                                    ))
                                }
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