import React, { Component } from "react";
import "./ViewEvent.css";
import Menubar from "./MenuBar"
import RefreshToken from "../RefreshToken"

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class ViewEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      classId: '',
      className: '',
      meetingLink: '',
      year: '',
      section: ''
    };

    this.changeClassId = this.changeClassId.bind(this);
    this.changeClassName = this.changeClassName.bind(this);
    this.changeMeetingLink = this.changeMeetingLink.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  changeClassId(event) {
    this.setState({ classId: event.target.value });
  }

  changeClassName(event) {
    this.setState({ className: event.target.value });
  }

  changeMeetingLink(event) {
    this.setState({ meetingLink: event.target.value });
  }

  changeYear(event) {
    this.setState({ year: event.target.value });
  }

  changeSection(event) {
    this.setState({ section: event.target.value });
  }

  componentDidMount() {
    var url = "http://127.0.0.1:8000/class_info/" + this.props.location.state.classId;
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
            classId: results.class_id,
            className: results.class_name,
            meetingLink: results.meeting_link,
            year: results.year,
            section: results.section
          });
        }
        else {
          //TODO alert user to errors
        }
      });
  }

  onFormSubmitted(event) {
    event.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
      document.getElementById("editEventButton").style.visibility = "hidden";
      document.getElementById("saveEventeButton").style.visibility = "visible";
    }
    else {
      this.setState({
        disabled: true
      });
      document.getElementById("editEventButton").style.visibility = "visible";
      document.getElementById("saveEventeButton").style.visibility = "hidden";


      var json = JSON.stringify({
        "class_id": this.state.classId,
        "class_name": this.state.className,
        "meeting_link": this.state.meetingLink,
        "year": this.state.year,
        "section": this.state.section
      });
      var url = "https://recess-api.herokuapp.com/class_info/" + this.state.classId;
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
            this.setState({
              classId: results.class_id,
              className: results.class_name,
              meetingLink: results.meeting_link,
              year: results.year,
              section: results.section
            });
          }
          else {
            //TODO alert user to errors
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
            <Row>
              <Form.Label className="pageTitle">View Event</Form.Label>
            </Row>
            <Row>
              <Col xs={12} lg={6}>
                <Form.Group controlId="classIdFormGroup">
                  <Form.Label className="rowStyle">Class Id:</Form.Label>
                  <Form.Control type="text" name="classIdInput" disabled={this.state.disabled} value={this.state.classId} onChange={this.changeClassId} />
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group controlId="classNameFormGroup">
                  <Form.Label className="rowStyle">Class Name:</Form.Label>
                  <Form.Control type="text" name="classNameInput" disabled={this.state.disabled} value={this.state.className} onChange={this.changeClassName} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={6}>
                <Form.Group controlId="meetingLinkFormGroup">
                  <Form.Label className="rowStyle">Meeting Link:</Form.Label>
                  <Form.Control type="text" name="meetingLinkInput" disabled="true" value={this.state.meetingLink} onChange={this.changeMeetingLink} />
                </Form.Group>
              </Col>
              <Col xs={12} lg={6}>
                <Form.Group controlId="sectionFormGroup">
                  <Form.Label className="rowStyle">Section:</Form.Label>
                  <Form.Control type="text" name="sectionInput" disabled={this.state.disabled} value={this.state.section} onChange={this.changeSection} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button block id="editEventButton" style={{ visibility: "visible" }} onClick={this.onFormSubmitted}>Edit Event</Button>
              </Col>
              <Col xs={12}>
                <Button block variant="success" id="saveEventeButton" style={{ visibility: "hidden" }} onClick={this.onFormSubmitted}>Save Event</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
export default ViewEvent;