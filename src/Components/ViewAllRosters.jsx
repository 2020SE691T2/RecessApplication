
import React, { Component } from "react";
import "./ViewAllRosters.css";
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


class ViewAllRosters extends Component {

  env;
  rosterList;
  constructor() {
    super();
    this.env = new Environment();
    this.rosterList = [];

    this.populateRosterList = this.populateRosterList.bind(this);
    this.viewRoster = this.viewRoster.bind(this);
  }

  componentDidMount() {
    this.populateRosterList();
  }

  populateRosterList() {
    var url = this.env.getRootUrl() + "/roster";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
      })
    })
      .then((resp) => resp.json())
      .then((results) => {
        if (RefreshToken(results)) {
          this.rosterList = results.results;
          this.forceUpdate();

        }
        else {
          toastr.error('Error', "Failed to get roster list.\nPlease log in again.")
        }
      });
  }

  viewRoster(e) {
    var node = e.target;
    var rosterId = node.dataset["rosterId"];
    this.props.history.push({
      pathname: '/ViewRoster',
      state: { currentRosterId: rosterId }
    })
  }

  render() {
    return (
      <div >
        <Menubar />
        <Container fluid className={'backgroundRosterPage'}>
          <br />
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <h2 className="textLabelRosterPage" id="pageTitle_roster">Available Rosters</h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <Button className="btn btn-light" href="/CreateRoster">Create a New Roster</Button>
              <br/>
              <br/>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={10}>
              <div className="rosterTableHolder">
                <Table bordered className="rosterTable">
                  <thead>
                    <tr>
                      <th className="rosterTableData">Roster Name</th>
                      <th className="rosterTableData">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.rosterList.map(roster => {
                      return (
                        <tr id={'roster' + roster.roster_id} key={'roster' + roster.roster_id}>
                          <td className="rosterTableData">{roster.roster_name}</td>
                          <td className="rosterTableData">
                            <Button onClick={this.viewRoster} data-roster-id={roster.roster_id}>View Details</Button>
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
export default ViewAllRosters;
