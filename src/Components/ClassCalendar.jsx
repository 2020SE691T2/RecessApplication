import React, { Component } from "react";
import "./ClassCalendar.css";
import Menubar from "./MenuBar"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment'
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
import { toastr } from 'react-redux-toastr'


// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const localizer = momentLocalizer(moment)


class ClassCalendar extends Component {

  classes = []

  constructor(props) {
    super(props);
    this.env = new Environment();
    this.state = {
    };

    var url = this.env.getRootUrl() + "/api/classes/";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      })
    })
      .then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          this.classes = results.schedules;
          this.cleanup();
          this.forceUpdate();
        }
        else {
          toastr.error('Error', "Failed to retrieve calendar.");
        }
      });

    this.navigateToClassDetail = this.navigateToClassDetail.bind(this);
    this.cleanup = this.cleanup.bind(this);

  }

  cleanup() {
    this.classes.forEach(cls => {
      cls.start_time = new Date(cls.start_time);
      cls.end_time = new Date(cls.end_time);
    });
  }


  navigateToClassDetail(event) {
    this.props.history.push({
      pathname: '/ViewEvent',
      state: { classId: event.class_id }
    })
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container fluid>
          <Row>
            <Col>
              <h1>My Calendar</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Calendar
                defaultView="week"
                localizer={localizer}
                events={this.classes}
                startAccessor="start_time"
                endAccessor="end_time"
                titleAccessor="class_name"
                min={new Date("2020-12-01T07:00:00")}
                max={new Date("2020-12-01T17:00:00")}
                onSelectEvent={this.navigateToClassDetail}
              />
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}
export default ClassCalendar;