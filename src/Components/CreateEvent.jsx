import React, { Component } from "react";
import "./CreateEvent.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import RefreshToken from "../RefreshToken";

class CreateEvent extends Component {

  env;

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      meetingLink: '',
      year: '',
      section: ''
    };

    this.changeId = this.changeId.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeMeetingLink = this.changeMeetingLink.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.createEvent = this.createEvent.bind(this);

    this.env = new Environment();

  }

  changeId(event) {
    this.setState({ "id": event.target.value });
  }

  changeName(event) {
    this.setState({ "name": event.target.value });
  }

  changeMeetingLink(event) {
    this.setState({ "meetingLink": event.target.value });
  }

  changeYear(event) {
    this.setState({ "year": event.target.value });
  }

  changeSection(event) {
    this.setState({ "section": event.target.value });
  }

  createEvent(event) {
    event.preventDefault();
    var json = JSON.stringify({
      "class_id": this.state.id,
      "class_name": this.state.name,
      "meeting_link": this.state.meetingLink,
      "year": this.state.year,
      "section": this.state.section
    });
    fetch(this.env.getRootUrl() + "/class_info/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    }).then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          if (results.class_id) {
            this.props.history.push({
              pathname: '/ViewEvent',
              state: { classId: results.class_id }
            })
          }
        }
        else {
          //TODO alert user of errors
        }
      });
    return false;
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_CA" fluid>
          <Form onSubmit={this.createEvent}>
            <div className="header">
              <Row>
                <Col>
                  <a href="/"> <Image src="./Recess_logo.png" alt={'Recess Logo'} fluid /></a>
                </Col>
              </Row>
            </div>
            <Row>
              <Col md={8}>
                <Form.Group controlId="idFormGroup">
                  <Form.Control
                    className="textInput"
                    name="id"
                    type="text"
                    placeholder="ID:"
                    value={this.state.id}
                    onChange={this.changeId}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <Form.Group controlId="nameFormGroup">
                  <Form.Control
                    className="textInput"
                    name="name"
                    type="text"
                    placeholder="Class Name:"
                    value={this.state.name}
                    onChange={this.changeName}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="meetingLinkFormGroup">
                  <Form.Control
                    className="textInput"
                    type="url"
                    name="meetingLink"
                    placeholder="Meeting Link:"
                    value={this.state.meetingLink}
                    onChange={this.changeMeetingLink}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <Form.Group controlId="yearFormGroup">
                  <Form.Control
                    className="textInput"
                    type="number"
                    placeholder="Year:"
                    value={this.state.year}
                    onChange={this.changeYear}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="sectionFormGroup">
                  <Form.Control
                    className="textInput"
                    name="section"
                    type="text"
                    placeholder="Section:"
                    value={this.state.section}
                    onChange={this.changeSection}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.createEvent} variant="primary">Create New Class Event</Button>
              </Col>
            </Row >
          </Form >
        </Container >
      </div >
    );
  }
}
export default CreateEvent;