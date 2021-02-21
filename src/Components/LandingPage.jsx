import React, { Component } from "react";
import "./LandingPage.css";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Menubar from "./MenuBar";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Menubar />
                <Container className=" background_LP " fluid>
                <Container>
            <Row>
              <Col>
                <Image src="/Recess_logo.png" className="logo_lp"></Image>
              </Col>
            </Row>
          </Container>

          <div className = "header_lp">
            <Row>
              <Col>
                <h1 >Calendar Management Made Simple!</h1>
                <h3 > <a href="#" className="subtitle">Click here to learn more!</a></h3>
                
              </Col>
            </Row>
          </div>

          <br/>

          <div className="infoBox"> 

          <Row>
            <Col md={3} className ="box1_lp">
              <Image className="imageIcons" src="/navigate.png"></Image>
              <h2>Easy Navigation for Students and Parents</h2>
            
            </Col>

            <Col md={3} className ="box2_lp">
            <Image className="imageIcons" src="/sun1.png"></Image>
              <h2>Bright Colors to Capture Student's Attention</h2>
            
            </Col>

            <Col md={3} className ="box3_lp">
            <Image className="imageIcons" src="/finger.png"></Image>
              <h2>Responsive Interface for Young Learners</h2>
            
            </Col>

            <Col md={3}className ="box4_lp">
            <Image className="imageIcons" src="/roster.png"></Image>
              <h2>Easy Roster Management for Educators</h2>
            
            </Col>


          </Row>

          </div>

    

          <div className="whiteSpace justify-content-md-center">
            
            <Row>

              <Col>

              
              
              <h2 className ="offerText"> What We Offer</h2>
              
              </Col>

              



            </Row>

            <br/>

            <Row>


            <Col>
              
              <Image className="calImage" src="/Calendarss.png"></Image>
              
              </Col>

              <Col>
              <h3>

                This user friendly calendar blah blah .
              </h3>
              
              </Col>
            </Row>
            
            


          </div>
                   
                </Container>
            </div>
        );
    }
}

export default LandingPage;