import React, { Component } from "react";
import "./ForgotPassword.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import * as Ladda from 'ladda';


class ForgotPassword extends Component {

  env;
  laddaButton;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.env = new Environment();
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  forgotPassword(event) {
    event.preventDefault();
    this.laddaButton.start();
    var json = JSON.stringify({
      "email": this.state.email
    });

    fetch(this.env.getRootUrl() + "/api/password_reset/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => {
      if (resp.status === 200) {
        this.laddaButton.stop();
        this.props.history.push({
          pathname: '/ConfirmForgotPassword'
        });
      }
      else {
        this.laddaButton.stop();
        toastr.error('Error', "Please verify that you entered a valid email address.");
      }
    });
  }

  componentDidMount() {
    this.laddaButton = Ladda.create(document.querySelector('#forgotPasswordButton'));
    if (sessionStorage.getItem("refreshToken")) {
      this.props.history.push({
        pathname: '/Calendar'
      });
    }
  }

  render() {
    return (
      <div>
        <Menubar />
        <Container fluid className="background_FP">
          <Form onSubmit={this.forgotPassword}>
            <Row>
              <Col>
                <Image src="./ForgotPasswordBanner.png" alt={'Forgot Password'} fluid />
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src="./pwlock.png" alt={'Password Image'} fluid />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} >
                <Form.Group controlId="emailFormGroup">
                  <Form.Control
                    className="forgotPasswordInput"
                    name="email_fp"
                    type="email"
                    placeholder="Enter your email here:"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    style={{ height: 64 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Button className="Submit_FP btn btn-light ladda-button" data-style="zoom-in" id="forgotPasswordButton" type="submit">
                  <span className="ladda-label">Submit</span>
                </Button>
              </Col>
            </Row >
          </Form>
        </Container>
      </div>
    );
  }
}
export default ForgotPassword;