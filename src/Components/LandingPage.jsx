import React, { Component } from "react";
import "./LandingPage.css";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Menubar from "./MenuBar";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Menubar />
        <Container className=" background_LP " fluid>
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Image src="/Recess_logo.png" fluid />
              </Col>
            </Row>
          </Container>
          <div className="header_lp">
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                <h1 >Academic Calendar Management Made Simple!</h1>
                <h3 > <a href="/About" className="subtitle">Click here to learn more!</a></h3>
              </Col>
            </Row>
          </div>
          <br />
          <div className="infoBox">
            <Row className="justify-content-md-center">
              <Col xs={6} md={3} className="box1_lp">
                <Image className="imageIcons" src="/navigate.png"></Image>
                <h2>Easy Navigation for Students and Parents</h2>
              </Col>
              <Col xs={6} md={3} className="box2_lp">
                <Image className="imageIcons" src="/sun1.png"></Image>
                <h2>Bright Colors to Capture Student's Attention</h2>
              </Col>
              <Col xs={6} md={3} className="box3_lp">
                <Image className="imageIcons" src="/finger.png"></Image>
                <h2>Responsive Interface for Young Learners</h2>
              </Col>
              <Col xs={6} md={3} className="box4_lp">
                <Image className="imageIcons" src="/roster.png"></Image>
                <h2>Easy Roster Management for Educators</h2>
              </Col>
            </Row>
          </div>
          <br />
          <div className="whiteSpace">
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                <h2 className="offerText"> What We Offer</h2>
              </Col>
            </Row>
            <br />
            <div className="content_right">
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  <Image className="calImage" src="/Calendarss.png"></Image>
                </Col>
                <Col xs={12} md={6}>
                  <h4>
                    This user user-friendly calendar allows educators to create Zoom integrated video meetings and calendar events for their students. The events
                    are easily accesible by young learners and include bright colors for enhanced interactivity!
                  </h4>
                </Col>
              </Row>
              <br />
              <br />
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  <Image className="calImage" src="/createEventSS.png"></Image>
                </Col>
                <Col xs={12} md={6}>
                  <h4>
                    Educators can create events seamlessly with the simple interface. Simply, input the requested information and the events are magicaclly created for both the educator and the young learners!
                  </h4>
                </Col>
              </Row>
            </div>
          </div>
          <br />
        </Container>
      </div>
    );
  }
}

export default LandingPage;
