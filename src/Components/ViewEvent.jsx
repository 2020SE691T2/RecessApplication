import React, { Component } from "react";
import "./ViewEvent.css";
import Menubar from "./MenuBar"
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import * as Ladda from 'ladda';

class ViewEvent extends Component {

  env;
  laddaButton;
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      eventId: '',
      className: '',
      meetingLink: '',
      year: '',
      section: ''
    };

    this.changeClassId = this.changeClassId.bind(this);
    this.changeClassName = this.changeClassName.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
    this.env = new Environment();
  }

  changeClassId(event) {
    this.setState({ classId: event.target.value });
  }

  changeClassName(event) {
    this.setState({ className: event.target.value });
  }

  changeYear(event) {
    this.setState({ year: event.target.value });
  }

  changeSection(event) {
    this.setState({ section: event.target.value });
  }

  componentDidMount() {
    this.laddaButton = Ladda.create(document.querySelector('#saveEventsButton'));
    if (!sessionStorage.getItem("refreshToken")) {
      this.props.history.push({
        pathname: '/login'
      });
    }
    else {
      if (typeof this.props.location.state !== 'undefined' &&
        typeof this.props.location.state.eventId !== 'undefined') {
        var url = this.env.getRootUrl() + "/event_info/" + this.props.location.state.eventId;
        fetch(url, {
          method: "GET",
          headers: new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
          })
        })
          .then((resp) => resp.json())
          .then((results) => {
            if (RefreshToken(results)) {
              this.setState({
                eventId: results.event_id,
                className: results.event_name,
                meetingLink: results.meeting_link,
                year: results.year,
                section: results.section
              });
            }
            else {
              toastr.error('Error', "Failed to get event.  Please verify event id.");
            }
          });
      }
    }
  }

  onFormSubmitted(event) {
    event.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
      document.getElementById("editEventButton").style.visibility = "hidden";
      document.getElementById("saveEventsButton").style.visibility = "visible";
    }
    else {
      this.laddaButton.start();
      this.setState({
        disabled: true
      });
      document.getElementById("editEventButton").style.visibility = "visible";
      document.getElementById("saveEventsButton").style.visibility = "hidden";


      var json = JSON.stringify({
        "event_id": this.state.eventId,
        "event_name": this.state.className,
        "year": this.state.year,
        "section": this.state.section
      });
      var url = this.env.getRootUrl() + "/event_info/" + this.state.eventId;
      fetch(url, {
        method: "PATCH",
        body: json,
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        }
      }).then((resp) => resp.json())
        .then((results) => {
          if (RefreshToken(results)) {
            this.laddaButton.stop();
            this.setState({
              eventId: results.event_id,
              className: results.event_name,
              meetingLink: results.meeting_link,
              year: results.year,
              section: results.section
            });
          }
          else {
            this.laddaButton.stop();
            toastr.error('Error', "Failed to update event.  Please try again.");
          }
        });
    }
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container fluid className={'backgroundViewEvent'}>
          <Form onSubmit={this.onFormSubmitted}>
            <Row className="justify-content-md-center">
              <Form.Label className="pageTitle">View Event</Form.Label>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} md={5}>
                <Form.Group controlId="eventIdFormGroup">
                  <Form.Label className="rowStyle">Class Id:</Form.Label>
                  <Form.Control type="text" name="eventIdInput" disabled={this.state.disabled} value={this.state.eventId} onChange={this.changeClassId} />
                </Form.Group>
              </Col>
              <Col xs={12} md={5}>
                <Form.Group controlId="classNameFormGroup">
                  <Form.Label className="rowStyle">Class Name:</Form.Label>
                  <Form.Control type="text" name="classNameInput" disabled={this.state.disabled} value={this.state.className} onChange={this.changeClassName} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} md={5}>
                <Form.Group controlId="meetingLinkFormGroup">
                  <Form.Label className="rowStyle">Meeting Link:</Form.Label>
                  <Nav class="nav-link-color" variant="pills" activeKey="1">
                    <Nav.Link eventKey="1" name="meetingLinkInput" href={this.state.meetingLink}>{this.state.meetingLink}</Nav.Link>
                  </Nav>
                </Form.Group>
              </Col>
              <Col xs={12} md={5}>
                <Form.Group controlId="sectionFormGroup">
                  <Form.Label className="rowStyle">Section:</Form.Label>
                  <Form.Control type="text" name="sectionInput" disabled={this.state.disabled} value={this.state.section} onChange={this.changeSection} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                <Button variant="light" id="editEventButton" className="viewEventButton" style={{ visibility: "visible" }} onClick={this.onFormSubmitted}>Edit Event</Button>
              </Col>
              <Col xs={12} md={10}>
                <Button variant="light" id="saveEventsButton" className="viewEventButton ladda-button" style={{ visibility: "hidden" }} data-style="zoom-in" data-spinner-color="#000" onClick={this.onFormSubmitted}>
                  <span className="ladda-label">Save Event</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
export default ViewEvent;