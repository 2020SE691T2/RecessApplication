
import React, { Component, useEffect, useState } from "react";
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
import { Dropdown, MenuItem, DropdownButton } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl'

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
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
            document.getElementById("pageTitle_roster").innerText = results.first_name + "'s Class Roster";
          }
          else {
            document.getElementById("pageTitle_roster").innerText = results.preferred_name + "'s Class Roster";
          }
        }
        else {
          toastr.error('Error', "Failed to get profile.\nPlease log in again.")
        }
      });
  }


  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_roster" fluid>


          <Row className="justify-content-md-center">
            <Col>
              <br />
              <h2 id="pageTitle_roster"> Mrs. Prayer's Class Roster</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4 className="addTeacherHeading"> Add Teacher(s)</h4>

            </Col>


          </Row>

          <Row>

            <Col>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Custom toggle
    </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey="1">Teacher 1</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Teacher 2</Dropdown.Item>
                  <Dropdown.Item eventKey="3" active>
                    Teacher 3
      </Dropdown.Item>
                  <Dropdown.Item eventKey="1">Teacher 4</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>,

                </Col>
          </Row>

        </Container>
      </div>
    );
  }
}
export default Roster;
