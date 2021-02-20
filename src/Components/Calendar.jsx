import React, { Component } from "react";
import "./Calendar.css";
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

class Calendar extends Component {
    
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
        this.prepareEventComponent = this.prepareEventComponent.bind(this);
        this.sortDailyEvents = this.sortDailyEvents.bind(this);
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
                    if (results.preferred_name === "") {
                        document.getElementById("pageTitle").innerText = results.first_name + "'s Weekly Class Calendar";
                    }
                    else {
                        document.getElementById("pageTitle").innerText = results.preferred_name + "'s Weekly Class Calendar";
                    }
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
                if (results.schedules) {
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
                    
                    this.mondayEvents = this.sortDailyEvents(this.mondayEvents);
                    this.tuesdayEvents = this.sortDailyEvents(this.tuesdayEvents);
                    this.wednesdayEvents = this.sortDailyEvents(this.wednesdayEvents);
                    this.thursdayEvents = this.sortDailyEvents(this.thursdayEvents);
                    this.fridayEvents = this.sortDailyEvents(this.fridayEvents);
                }
                this.forceUpdate();
            });
    }

    sortDailyEvents(dailyEventArray) {
        return dailyEventArray.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
    }
    
    componentDidMount() {
        if (!sessionStorage.getItem("refreshToken")) {
            this.props.history.push({
                pathname: '/login'
            });
        }
        else {
            this.populatePageTitle();
            //taken from https://weeknumber.net/how-to/javascript
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            var currentWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                - 3 + (week1.getDay() + 6) % 7) / 7);
            this.getEventsFromDatabase(date.getFullYear(), currentWeek);
        }
    }

    prepareEventComponent(data) {
        return (
            <CalendarEvent startTime={data.start_time}
            endTime={data.end_time}
            link={data.meeting_link}
            className={data.class_name}
            day={data.weekday} />
        )
    }
    
    render() {
        return (
            <div>
                <Menubar />
                <Container className="backgroundNewCal" fluid>
                    <Row className="justify-content-md-center">
                        <Col>
                            <br/>
                            <h2 id="pageTitle"> </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <br/>
                            <CalDate />
                        </Col>
                    </Row>
                    <div>
                        <p></p>
                    </div>
                    <Row className="justify-content-md-center">
                        <br/>
                        <Col xs={2}>
                            <h3 style={{color:'#a0df76'}}>Monday </h3>
                            <div className="box1 calendarDay">
                                {
                                    this.mondayEvents.map(event => this.prepareEventComponent(event))
                                }
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3 style={{color:'#ec1c6a'}}>Tuesday</h3>
                            <div className="box2 calendarDay">
                                {
                                    this.tuesdayEvents.map(event => this.prepareEventComponent(event))
                                }
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3 style={{color:'#fcb005'}}>Wednesday</h3>
                            <div className="box3 calendarDay">
                                {
                                    this.wednesdayEvents.map(event => this.prepareEventComponent(event))
                                }
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3 style={{color:'#20a9ed'}}> Thursday</h3>
                            <div className="box4 calendarDay">
                                {
                                    this.thursdayEvents.map(event => this.prepareEventComponent(event))
                                }
                            </div>
                        </Col>
                        <Col xs={2}>
                            <h3 style={{color:'#885cbb'}}> Friday</h3>
                            <div className="box5 calendarDay">
                                {
                                    this.fridayEvents.map(event => this.prepareEventComponent(event))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div>
        );
    }
}

export default Calendar;
