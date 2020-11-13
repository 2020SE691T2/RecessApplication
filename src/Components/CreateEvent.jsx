import React, { Component } from "react";
import "./CreateEvent.css";
import Menubar from "./MenuBar"

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';


class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      meetingLink: '',
      year: '',
      section: ''
    };

    this.changeName = this.changeName.bind(this);
    this.changeMeetingLink = this.changeMeetingLink.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeSection = this.changeSection.bind(this);
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
      "class_name": this.state.name,
      "meeting_link": this.state.meetingLink,
      "year": this.state.year,
      "section": this.state.section
    });
    fetch("https://recess-api.herokuapp.com/class_info/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => resp.json())
      .then((results) => {
        console.log(results);
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
                  <a href="/"> <Image src="./Recess_logo.png" alt={'Recess Logo'} fluid/></a>
                </Col>
              </Row>
            </div>
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
                    type="text"
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
                    type="text"
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
                <input className="Submit_CA " type="submit" value="" />
              </Col>
            </Row >
          </Form >
        </Container >
      </div >
    );
  }
}
export default CreateEvent;