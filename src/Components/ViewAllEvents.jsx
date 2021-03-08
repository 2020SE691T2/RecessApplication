
import React, { Component } from "react";
import "./ViewAllEvents.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import RefreshToken from "../RefreshToken";


class ViewAllEvents extends Component {

  env;
  eventList;
  constructor() {
    super();
    this.env = new Environment();
    this.eventList = [];

    this.populateEventList = this.populateEventList.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
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
      else {
        this.populateEventList();
      }
    }
  }

  populateEventList() {
    var url = this.env.getRootUrl() + "/event_info/";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      })
    })
      .then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          this.eventList = results.results;
          this.forceUpdate();

        }
        else {
          toastr.error('Error', "Failed to get event list.")
        }
      });
  }

  viewEvent(e) {
    var node = e.target;
    var eventId = node.dataset["eventId"];
    this.props.history.push({
      pathname: '/ViewEvent',
      state: { currentEventId: eventId }
    })
  }

  render() {
    return (
      <div >
        <Menubar />
        <Container fluid className={'backgroundEventsPage'}>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <h2 className="textLabelEventPage" id="pageTitle_event">Available Events</h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <Button className="btn btn-light" href="/CreateEvent">Create a New Event</Button>
              <br />
              <br />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <div className="eventTableHolder">
                <Table bordered className="eventTable">
                  <thead>
                    <tr>
                      <th className="eventTableData">Event Name</th>
                      <th className="eventTableData">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.eventList.map(event => {
                      return (
                        <tr id={'event' + event.event_id} key={'event' + event.event_id}>
                          <td className="eventTableData">{event.event_name}</td>
                          <td className="eventTableData">
                            <Button onClick={this.viewEvent} data-event-id={event.event_id}>View Details</Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ViewAllEvents;
