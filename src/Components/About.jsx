import React, { Component } from "react";
import "./About.css";
import Menubar from "./MenuBar"
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class AboutPage extends Component {

  render() {
    return (
      <div>
        <Menubar />
        <Container className="background_login" fluid>
          <Container>
            <Row>
              <Col>
                <Image src="/Recess_logo.png" className="logo"></Image>
              </Col>
            </Row>
          </Container>
          <Container className="content">
            <Row>
              <Col>
              <h1>Recess Application</h1>
              <p>
                Recess Application aims to be the one stop shop for early education remote learning. 
                By integrating an easy to use interface, designed for children, with robust features like day management and remote classroom integrations.
              </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Project & Drexel University</h2>
                <p>
                  The project is being developed for SE691 at Drexel University as part of completing a Master's program. The course covers two academic terms where students form teams and 
                  work together for form a product over the six month period. The requirements for what must be built are loose, but students are expected to deliver progress each week through the form of a demo. 

                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h2>The Development Team</h2>
                    <p>
                      In general, work among this team is divided equally, yet self assigned. Certain people prefer working on the API vs Frontend vs Design and may choose to take up tasks that the group identifies as work items, 
                      or by identifying improvements themselves. 
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Matt Griffiths</h4>
                  </Col>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Dylan Zeller</h4>
                  </Col>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Matt Knobloch</h4>
                  </Col>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Jeffery Durelli</h4>
                  </Col>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Wendy Prayer</h4>
                  </Col>
                  <Col xs={12} sm={4} lg={2}>
                    <Image src="/profile_placeholder.png" rounded className="profileImage"/>
                    <h4>Jon McDaniel</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Code & Project</h2>
                The project is open source and consists of two main sub-projects: the website that you see, and the web API that you don't. The code for both projects can be found <a href="https://github.com/2020SE691T2">here</a>. 
                Our frontend has been created using <a href="https://reactjs.org/">React</a>, coupled with <a href="https://react-bootstrap.github.io/">React Bootstrap</a> and a few other nice to have libraries, while our backend API was developed using <a href="https://www.djangoproject.com/">Django</a>. 
                For our testing deployment we have been using a <a href="https://www.heroku.com/">Heroku</a> instance which deploys automatically when we push new code to our main branch for either project to GitHub.
              </Col>
            </Row>
          </Container>

        </Container>
      </div>
    );
  }
}
export default AboutPage;
