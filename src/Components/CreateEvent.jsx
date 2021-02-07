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
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class CreateEvent extends Component {

  env;
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      year: '',
      section: ''
    };

    this.changeId = this.changeId.bind(this);
    this.changeName = this.changeName.bind(this);
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
          toastr.error('Error', "Failed to create event. Please enter all information.", "Error")
        }
      });
    return false;
  }

  componentDidMount() {
    if (sessionStorage.getItem("role") != "Teacher") {
      this.props.history.push({
        pathname: '/Calendar'
      });
    }
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_CE" fluid>
          <Form onSubmit={this.createEvent}>
            <Row className="justify-content-md-center">
              <Col>
                <a href="/"> <Image src="./Recess_logo.png" alt={'Recess Logo'} fluid /></a>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} xs={12}>
                <Form.Group controlId="idFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="id"
                    type="text"
                    placeholder="ID:"
                    value={this.state.id}
                    onChange={this.changeId}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
              <Col md={5} xs={12}>
                <Form.Group controlId="nameFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    name="name"
                    type="text"
                    placeholder="Class Name:"
                    value={this.state.name}
                    onChange={this.changeName}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} xs={12}>
                <Form.Group controlId="yearFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    type="number"
                    placeholder="Year:"
                    value={this.state.year}
                    onChange={this.changeYear}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
              <Col md={5} xs={12}>
                <Form.Group controlId="sectionFormGroup">
                  <Form.Control
                    className="textInput_CE"
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
            <Row className="justify-content-md-center">
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