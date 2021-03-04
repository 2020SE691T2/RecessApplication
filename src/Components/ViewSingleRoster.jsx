import React, { Component } from "react";
import "./Roster.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import RefreshToken from "../RefreshToken"
import { Button, Dropdown } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import * as Ladda from 'ladda';
import CustomMenu from './CustomMenu';
import CustomToggle from './CustomToggle';

class ViewSingleRoster extends Component {

  env;
  laddaButton;
  eligibleTeachers = {};
  eligibleStudents = {};
  constructor() {
    super();

    this.state = {
      rosterName: ""
    }

    this.handleTeacherDropdownSelection = this.handleTeacherDropdownSelection.bind(this);
    this.handleStudentDropdownSelection = this.handleStudentDropdownSelection.bind(this);
    this.loadEligibleParticipants = this.loadEligibleParticipants.bind(this);
    this.populateExisting = this.populateExisting.bind(this);
    this.updateRosterEntry = this.updateRosterEntry.bind(this);
    this.xButtonClicked = this.xButtonClicked.bind(this);
    this.prepareFinalRoster = this.prepareFinalRoster.bind(this);
    this.submitRoster = this.submitRoster.bind(this);
    this.rosterNameChange = this.rosterNameChange.bind(this);

    this.env = new Environment();

  }

  componentDidMount() {
    this.laddaButton = Ladda.create(document.querySelector('#updateRosterButton'));
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
      else {
        this.loadEligibleParticipants();
      }
    }
  }

  populateExisting() {
    fetch(this.env.getRootUrl() + "/roster/" + this.props.location.state.currentRosterId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    }).then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          this.setState({ rosterName: results.roster_name });
          if (results.participants) {
            results.participants.forEach(individual => {
              this.handleStudentDropdownSelection(individual.email_address, false);
              this.handleTeacherDropdownSelection(individual.email_address, false);
            });
          }
          this.forceUpdate();
        }
      });
  }

  loadEligibleParticipants() {
    var url = this.env.getRootUrl() + "/api/participants";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      })
    })
      .then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          var participants = JSON.parse(results.data);
          participants.students.forEach(student => {
            this.eligibleStudents[student.emailaddress] = student;
          });
          participants.teachers.forEach(teacher => {
            this.eligibleTeachers[teacher.emailaddress] = teacher;
          })
        }
        else {
          toastr.error('Error', "Failed to get profile.\nPlease log in again.")
        }
        this.populateExisting();
        this.forceUpdate();
      });
  }

  handleTeacherDropdownSelection(e, update = true) {
    if (this.eligibleTeachers[e]) {
      this.eligibleTeachers[e]["selected"] = true;
      if (update) {
        this.forceUpdate();
      }
    }
  }

  handleStudentDropdownSelection(e, update = true) {
    if (this.eligibleStudents[e]) {
      this.eligibleStudents[e]["selected"] = true;
      if (update) {
        this.forceUpdate();
      }
    }
  }

  createDropdownItem(participant) {
    var fullName = participant.firstname + " " + participant.lastname;
    return (
      <Dropdown.Item eventKey={participant.emailaddress} key={participant.emailaddress}>{fullName}</Dropdown.Item>
    )
  }

  xButtonClicked(event) {
    var node = event.target;
    var type = node.dataset["type"];
    var email = node.dataset["email"];

    if (type === "teacher") {
      this.eligibleTeachers[email]["selected"] = false;
    }

    if (type === "student") {
      this.eligibleStudents[email]["selected"] = false;
    }
    this.forceUpdate();
  }

  updateRosterEntry(email, type) {
    return (
      <div className="txtInputButton flex" id={"roster+" + email} key={email}>
        <p className="inputBox" type="text" disabled />
        {email}
        <button type="button" className="btn">
          <Image className="xButton" src="./x.png" data-email={email} data-type={type} onClick={this.xButtonClicked} />
        </button>
      </div >
    );
  }

  rosterNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  prepareFinalRoster() {
    //prepare body
    var rosterJson = {
      "roster_name": this.state.rosterName,
      "participants": []
    }
    var participant;
    var email;

    //load teachers
    var teachers = Object.keys(this.eligibleTeachers);
    for (var teacher in teachers) {
      participant = this.eligibleTeachers[teachers[teacher]];
      if (participant["selected"] === true) {
        email = participant["emailaddress"];
        rosterJson.participants.push({
          "email_address": email
        });
      }
    }

    // load students
    var students = Object.keys(this.eligibleStudents);
    for (var student in students) {
      participant = this.eligibleStudents[students[student]];
      if (participant["selected"] === true) {
        email = participant["emailaddress"];
        rosterJson.participants.push({
          "email_address": email
        });
      }
    }

    this.submitRoster(JSON.stringify(rosterJson));
  }

  submitRoster(rosterJson) {
    this.laddaButton.start();
    if (this.state.rosterName.trim() !== "") {
      fetch(this.env.getRootUrl() + "/roster/" + this.props.location.state.currentRosterId, {
        method: "PATCH",
        body: rosterJson,
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
        }
      }).then((resp) => resp.json())
        .then((results) => {
          if (RefreshToken(results)) {
            if (results.roster_id) {
              this.laddaButton.stop();
              toastr.success('Updated Class Roster', "Updated your roster. You must now associate it with a class when ready.")
              this.props.history.push({
                pathname: '/Calendar',
                state: { classId: results.class_id }
              })
            }
            else {
              this.laddaButton.stop();
              toastr.error('Error', "Failed to update roster. Please check network traffic for error information", "Error")
            }
          }
          else {
            this.laddaButton.stop();
            toastr.error('Error', "Failed to update roster. Please check network traffic for error information", "Error")
          }
        });
    } else {
      this.laddaButton.stop();
      toastr.error('Error', "Failed to update roster. You must provide a roster name", "Error")
    }

  }

  render() {
    return (
      <div >
        <Menubar />
        <Container fluid className={'backgroundRosterPage'}>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <h2 className="textLabelRosterPage" id="pageTitle_roster">Edit Roster</h2>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={10} md={5}>
              <Form.Control
                type="text"
                name="rosterName"
                className="textLabelRosterPage"
                value={this.state.rosterName}
                onChange={this.rosterNameChange}
                placeholder="Roster Name"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row className="justify-content-md-center">
            <Col xs={5}>
              <h4 className="addTeacherHeading"> Add Teacher(s)</h4>
            </Col>
            <Col xs={5}>
              <h4 className="teacherField">Teacher</h4>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={5}>
              <Dropdown className="teacherMenu" onSelect={this.handleTeacherDropdownSelection}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Co-Teacher's Name(s)
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdownScroll" as={CustomMenu}>
                  {
                    Object.keys(this.eligibleTeachers).map(teacher => {
                      var participant = this.eligibleTeachers[teacher];
                      return this.createDropdownItem(participant);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={5}>
              <Form id="teacherListForm">
                {
                  Object.keys(this.eligibleTeachers).map(teacher => {
                    var selectedTeacher = this.eligibleTeachers[teacher];
                    if (selectedTeacher["selected"] === true) {
                      return this.updateRosterEntry(selectedTeacher["emailaddress"], "teacher");
                    }
                    return ""
                  })
                }
              </Form>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={5}>
              <h4 className="addStudentHeading"> Add Student(s)</h4>
            </Col>
            <Col xs={5}>
              <h4 className="studentField">Student</h4>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={5}>
              <Dropdown className="studentMenu" onSelect={this.handleStudentDropdownSelection}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Student's Name(s)
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdownScroll" as={CustomMenu}>
                  {
                    Object.keys(this.eligibleStudents).map(student => {
                      var participant = this.eligibleStudents[student];
                      return this.createDropdownItem(participant);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={5}>
              <Form id="studentListForm">
                {
                  Object.keys(this.eligibleStudents).map(student => {
                    var selectedStudent = this.eligibleStudents[student];
                    if (selectedStudent["selected"] === true) {
                      return this.updateRosterEntry(selectedStudent["emailaddress"], "student");
                    }
                    return ""
                  })
                }
              </Form>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Button variant="light" onClick={this.prepareFinalRoster} className="rosterButton ladda-button" data-style="zoom-in" data-spinner-color="#000" id="updateRosterButton">
                <span className="ladda-label">Update Roster</span>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ViewSingleRoster;
