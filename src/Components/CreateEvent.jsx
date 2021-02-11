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
      days: '',
      startTime: '',
      endTime: '',
      section: ''
    };
    
    this.changeId = this.changeId.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeDays = this.changeDays.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
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

  // FIX THIS - THIS IS WHERE SHIT IS SENT TO THE BACKEND
  createEvent(event) {
    event.preventDefault();
    var json = JSON.stringify({
      "class_name": this.state.name,
      "year": this.state.year,
      "days" : this.state.days,
      "start" : this.state.startTime,
      "end" : this.state.endTime,
      "section" : this.state.section
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
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_CE" align-content="center" fluid>
          <Form onSubmit={this.createEvent}>
            <Row className="justify-content-md-center">
              <Col>
                <a href="/"> <Image src="./Recess_logo.png" alt={'Recess Logo'} fluid /></a>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Class name: </p>
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
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">School year: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="yearFormGroup">
                  <Form.Control
                    className="textInput_CE"
                    type="number" min="2019" max="2025"
                    
                    value={this.state.year}
                    onChange={this.changeYear}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">Meeting days: </p>
              </Col>
              <Col md={3} xs={12}>
                <Form.Group controlId="daySelectFormGroup">
                  <Form.Control as="select" multiple 
                    className="daySelect_CE"
                    name="days"
                    value={this.props.arrayOfOptionValues}
                    onChange={this.changeDays}
                    style={{ height: 128 }}>
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
                <p className="textPlaceholder_CE">Start time: </p>
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
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="justify-content-md-center">
              <Col md={3} xs={12}>
                <p className="textPlaceholder_CE">End time: </p>
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
                  />
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
            
            <br/>
            
            <Row className="justify-content-md-center">
              <Col>
                  <a href="/#" className="CE_Button" onClick={this.createEvent}>Create New Event</a>
              </Col>
            </Row >
          </Form >
        </Container >
      </div >
    );
  }
}
export default CreateEvent;