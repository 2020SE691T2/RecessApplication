import React, { Component } from "react";
import "./Events.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RefreshToken from "../RefreshToken";
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import * as Ladda from 'ladda';


class Events extends Component {

  env;
  laddaButton;
  rosters = [];

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      year: '',
      days: '',
      startTime: '',
      endTime: '',
      section: '',
      selectedRoster: ''
    };

    this.changeName = this.changeName.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeDays = this.changeDays.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.createUpdateEvent = this.createUpdateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.changeRoster = this.changeRoster.bind(this);
    this.populateRosterList = this.populateRosterList.bind(this);
    this.createRosterDropdownItems = this.createRosterDropdownItems.bind(this);
    this.populateExisting = this.populateExisting.bind(this);
    this.setPageStrings = this.setPageStrings.bind(this);
    this.setDaySelected = this.setDaySelected.bind(this);

    this.env = new Environment();
  }

  changeName(event) {
    this.setState({ "name": event.target.value });
  }

  changeYear(event) {
    this.setState({ "year": event.target.value });
  }

  changeStart(event) {
    this.setState({ "startTime": event.target.value });
  }

  changeEnd(event) {
    this.setState({ "endTime": event.target.value });
  }

  changeDays(event) {
    let values = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({ "days": values });
  }

  changeSection(event) {
    this.setState({ "section": event.target.value });
  }

  changeRoster(event) {
    if (event.target.value !== "") {
      this.setState({ "selectedRoster": this.rosters[event.target.value].roster_id });
    }
  }

  createRosterDropdownItems() {
    let items = [];
    this.rosters.forEach(roster => (
      items.push(<option key={roster.roster_id} value={roster.roster_id}>{roster.roster_name}</option>)
    ));
    return items;
  }

  setPageStrings() {
    if (this.props.location.state) {
      document.getElementById("pageTitle_event").innerHTML = "Edit Event";
      document.getElementById("createUpdateButtonText").innerHTML = "Update Event";
    }
    else {
      document.getElementById("pageTitle_event").innerHTML = "Create New Event";
      document.getElementById("createUpdateButtonText").innerHTML = "Create Event";
    }
  }

  createSchoolYearDropdownItems() {
    //define a date object variable that will take the current system date  
    const todayDate = new Date();
    const todayYear = todayDate.getFullYear()

    //find the year of the current date  
    const oneJan = new Date(todayDate.getFullYear(), 0, 1);

    // calculating number of days in given year before a given date   
    const numberOfDays = Math.floor((todayDate - oneJan) / (24 * 60 * 60 * 1000));

    // add 1 since to current date and returns value starting from 0   
    const weekNum = Math.ceil((todayDate.getDay() + 1 + numberOfDays) / 7);

    // set the smallest year and adjust it if necessary
    var year0 = todayYear;
    if (weekNum < 30) {
      year0 -= 1;
    }

    let items = [];
    var itemYear = year0;
    for (var i = 0; i < 4; i++) {
      items.push(<option value={itemYear}>{itemYear + "/" + (itemYear + 1).toString().substr(2, 3)}</option>)
      itemYear++;
    }
    return items;
  }

  populateRosterList() {
    fetch(this.env.getRootUrl() + "/roster", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    }).then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          var temp = results.results;
          temp.forEach(roster => {
            this.rosters[roster.roster_id] = roster;
          });
        }
        this.forceUpdate();
      });
  }

  valid_input() {

    if (this.state.startTime >= this.state.endTime)
      return false;
    return true;
  }

  createUpdateEvent(event) {
    event.preventDefault();
    this.laddaButton.start();
    if (!this.valid_input()) {
      this.laddaButton.stop();
      window.alert("Please fill out form completely!");
    } else {
      var json = JSON.stringify({
        "event_name": this.state.name,
        "year": this.state.year,
        "days": this.state.days,
        "start": this.state.startTime,
        "end": this.state.endTime,
        "section": this.state.section,
        "roster": this.state.selectedRoster
      });
      console.log(json);
      if (this.props.location.state) {
        fetch(this.env.getRootUrl() + "/event_info/" + this.props.location.state.currentEventId, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
          }
        }).then((resp) => resp.json())
          .then((results) => {
            if (RefreshToken(results)) {
              if (results.event_id) {
                this.laddaButton.stop();
                this.props.history.push({
                  pathname: '/EventList'
                })
              }
            }
            else {
              this.laddaButton.stop();
              toastr.error('Error', "Failed to edit event.", "Error")
            }
          });
      }
      else {
        fetch(this.env.getRootUrl() + "/api/create-event/", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
          }
        }).then((resp) => resp.json())
          .then((results) => {
            this.laddaButton.stop();
            if (RefreshToken(results)) {
              if (results.event_id) {
                this.laddaButton.stop();
                this.props.history.push({
                  pathname: '/EventList'
                })
              }
            }
            else {
              this.laddaButton.stop();
              toastr.error('Error', "Failed to create event. Please enter all information.", "Error")
            }
          });
      }
    }
  }

  deleteEvent(event) {
    event.preventDefault();
    fetch(this.env.getRootUrl() + "/event_info/" + this.props.location.state.currentEventId, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    }).then((resp) => {
      if (resp.status === 204) {
        toastr.success('Deleted Class Event', "Successfully deleted the event.");
        this.props.history.push({
          pathname: '/EventList'
        });
      }
      else {
        toastr.error('Error', "Failed to delete event.", "Error")
      }
    });
  }

  componentDidMount() {
    this.laddaButton = Ladda.create(document.querySelector('#createEventButton'));
    if (!sessionStorage.getItem("refreshToken")) {
      this.props.history.push({
        pathname: '/login'
      });
    }
    else {
      if (sessionStorage.getItem("role") !== "Teacher") {
        this.props.history.push({
          pathname: '/Calendar'
        });
      }
    }
    this.setPageStrings();
    this.populateRosterList();
    if (this.props.location.state) {
      this.populateExisting();
    }
  }

  setDaySelected(schedule) {

  }

  populateExisting() {
    fetch(this.env.getRootUrl() + "/event_info/" + this.props.location.state.currentEventId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    }).then((resp) => resp.json())
      .then((results) => {
        console.log(results);
        if (RefreshToken(results)) {
          //"days": this.state.days,
          this.setState({ name: results.event_name });
          this.setState({ year: results.year });
          results.event_schedule.forEach(schedule => (
            this.setDaySelected(schedule)
          ));
          if (results.event_schedule[0]) {
            this.setState({ startTime: results.event_schedule[0].start_time });
            this.setState({ endTime: results.event_schedule[0].end_time });
          }
          if (results.event_enrollment[0]) {
            this.setState({ selectedRoster: results.event_enrollment[0].roster_id });
          }
          this.setState({ section: results.section });
          this.forceUpdate();
        }
      });
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_CE" align-content="center" fluid>
          <Form onSubmit={this.createUpdateEvent}>
            <br />
            <Row className="justify-content-md-center">
              <Col xs={10}>
                <h2 className="eventTitle" id="pageTitle_event"> </h2>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Class Name: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="nameFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.changeName}
                    style={{ height: 64 }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">School Year: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="yearSelectFormGroup">
                  <Form.Control as="select"
                    className="daySelect_CE"
                    name="year"
                    value={this.state.year}
                    onChange={this.changeYear}
                    required>
                    <option disabled selected value="" key={-1}>select</option>
                    {this.createSchoolYearDropdownItems()}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Meeting Days: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="daySelectFormGroup">
                  <Form.Control as="select" multiple
                    className="daySelect_CE"
                    name="days"
                    value={this.state.days}
                    onChange={this.changeDays}
                    style={{ height: 128 }}
                    required>
                    <option value={0}>Monday</option>
                    <option value={1}>Tuesday</option>
                    <option value={2}>Wednesday</option>
                    <option value={3}>Thursday</option>
                    <option value={4}>Friday</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Start Time: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="StartTimeFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="start-time"
                    type="time" min="9:00" max="17:00"
                    value={this.state.startTime}
                    onChange={this.changeStart}
                    style={{ height: 64 }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">End Time: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="endTimeFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="end-time"
                    type="time" min="9:00" max="17:00"
                    value={this.state.endTime}
                    onChange={this.changeEnd}
                    style={{ height: 64 }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Roster: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="rosterSelectFormGroup">
                  <Form.Control as="select"
                    className="daySelect_CE"
                    name="roster"
                    value={this.state.selectedRoster}
                    onChange={this.changeRoster}>
                    <option disabled selected value="" key={-1}>select</option>
                    {this.createRosterDropdownItems()}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Section: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="sectionFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="section"
                    type="text"
                    placeholder="Optional"
                    value={this.state.section}
                    onChange={this.changeSection}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-md-center">
              <Col>
                <Button variant="light" className="eventButton ladda-button" onClick={this.createUpdateEvent} data-style="zoom-in" data-spinner-color="#000" id="createEventButton">
                  <span className="ladda-label" id="createUpdateButtonText"> </span>
                </Button>
              </Col>
            </Row >
            <br />
            <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                <Button variant="light" hidden={this.props.location.state ? false : true} onClick={this.deleteEvent} className="eventButton ladda-button" data-style="zoom-in" data-spinner-color="#000" id="deleteEventButton">
                  <span className="ladda-label">Delete Event</span>
                </Button>
              </Col>
            </Row>
          </Form >
        </Container >
      </div >
    );
  }
}
export default Events;