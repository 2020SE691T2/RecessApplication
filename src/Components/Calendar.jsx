import React, { Component } from "react";
import "./Calendar.css";
import Menubar from "./MenuBar"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const localizer = momentLocalizer(moment)


class ClassCalendar extends Component {

  classes = [
    {
      "classId": 1,
      "title": "Class Test 1",
      "start": new Date("2020-11-22T14:30:00Z"),
      "end": new Date("2020-11-22T16:30:00Z")
    }
  ]

  /*

  */

  constructor(props) {
    super(props);
    this.state = {
    };

    this.navigateToClassDetail = this.navigateToClassDetail.bind(this);

  }


  navigateToClassDetail(event) {
    debugger;
    this.props.history.push({
      pathname: '/ViewEvent',
      state: { classId: event.classId }
    })
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container>
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
                startAccessor="start"
                endAccessor="end"
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