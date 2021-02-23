
import React, { Component, useState } from "react";
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
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="."
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
      &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);



class Roster extends Component {

  env;
  teachers = [];
  students = [];
  eligibleTeachers = {};
  eligibleStudents = {};
  constructor() {
    super();
    this.handleTeacherDropdownSelection = this.handleTeacherDropdownSelection.bind(this);
    this.handleStudentDropdownSelection = this.handleStudentDropdownSelection.bind(this);
    this.loadEligibleParticipants = this.loadEligibleParticipants.bind(this);
    this.createRosterEntry = this.createRosterEntry.bind(this);
    this.xButtonClicked = this.xButtonClicked.bind(this);
    this.prepareFinalRoster = this.prepareFinalRoster.bind(this);
    this.submitRoster = this.submitRoster.bind(this);

    this.env = new Environment();

  }

  componentDidMount() {
    this.populatePageTitle_roster();
    this.loadEligibleParticipants();
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
        this.forceUpdate();
      });
  }

  populatePageTitle_roster() {
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
            document.getElementById("pageTitle_roster").innerHTML = results.first_name + "'s Class Roster";
          }
          else {
            document.getElementById("pageTitle_roster").innerHTML = results.preferred_name + "'s Class Roster";
          }
        }
        else {
          toastr.error('Error', "Failed to get profile.\nPlease log in again.")
        }
      });
  }

  handleTeacherDropdownSelection(e) {
    this.eligibleTeachers[e]["selected"] = true;
    this.forceUpdate();
  }

  handleStudentDropdownSelection(e) {
    this.eligibleStudents[e]["selected"] = true;
    this.forceUpdate();
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

  createRosterEntry(email, type) {
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

  prepareFinalRoster() {
    //prepare body
    var rosterJson = {
      "roster_name": "Test Roster",
      "participants": []
    }

    //load teachers
    Object.keys(this.eligibleTeachers).map(teacher => {
      var participant = this.eligibleTeachers[teacher];
      if (participant["selected"] === true) {
        var email = participant["emailaddress"];
        rosterJson.participants.push({
          "email_address": email
        });
      }
      return true;
    });

    // load students
    Object.keys(this.eligibleStudents).map(student => {
      var participant = this.eligibleStudents[student];
      if (participant["selected"] === true) {
        var email = participant["emailaddress"];
        rosterJson.participants.push({
          "email_address": email
        });
      }
      return true;
    });

    this.submitRoster(JSON.stringify(rosterJson));
  }

  submitRoster(rosterJson) {
    console.log(rosterJson);
    // fetch(this.env.getRootUrl() + "/roster", {
    //   method: "POST",
    //   body: rosterJson,
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    //   }
    // }).then((resp) => resp.json())
    //   .then((results) => {
    //     if (RefreshToken(results)) {
    //       toastr.success('Created Class Roster', "Created your roster. You must now associate it with a class when ready.")
    //       this.props.history.push({
    //         pathname: '/Calendar',
    //         state: { classId: results.class_id }
    //       })
    //     }
    //     else {
    //       toastr.error('Error', "Failed to create roster. Please check network traffic for error information", "Error")
    //     }
    //   });
  }

  render() {
    return (
      <div >
        <Menubar />
        <Container className="background_roster" fluid>
          <Row className="justify-content-md-center">
            <Col>
              <br />
              <h2 id="pageTitle_roster"> </h2>
            </Col>
          </Row>
          <br />
          <br />
          <Row className="justify-content-md-center">
            <Col>
              <h4 className="addTeacherHeading"> Add Teacher(s)</h4>
            </Col>
            <Col>
              <h4 className="teacherField">Teacher</h4>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col >
              <Dropdown className="teacherMenu" onSelect={this.handleTeacherDropdownSelection}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Co-Teacher's Name(s)
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  {
                    Object.keys(this.eligibleTeachers).map(teacher => {
                      var participant = this.eligibleTeachers[teacher];
                      return this.createDropdownItem(participant);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Form id="teacherListForm">
                {
                  Object.keys(this.eligibleTeachers).map(teacher => {
                    var selectedTeacher = this.eligibleTeachers[teacher];
                    if (selectedTeacher["selected"] === true) {
                      return this.createRosterEntry(selectedTeacher["emailaddress"], "teacher");
                    }
                    return ""
                  })
                }
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <h4 className="addStudentHeading"> Add Student(s)</h4>
            </Col>
            <Col>
              <h4 className="studentField">Student</h4>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col >
              <Dropdown className="studentMenu" onSelect={this.handleStudentDropdownSelection}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Student's Name(s)
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {
                    Object.keys(this.eligibleStudents).map(student => {
                      var participant = this.eligibleStudents[student];
                      return this.createDropdownItem(participant);
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={6}>
              <Form id="studentListForm">
                {
                  Object.keys(this.eligibleStudents).map(student => {
                    var selectedStudent = this.eligibleStudents[student];
                    if (selectedStudent["selected"] === true) {
                      return this.createRosterEntry(selectedStudent["emailaddress"], "student");
                    }
                    return ""
                  })
                }
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button onClick={this.prepareFinalRoster}>Click to Complete Roster</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Roster;
