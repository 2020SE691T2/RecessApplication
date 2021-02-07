import React, { Component } from "react";
import "./LoginApp.css";
import Menubar from "./MenuBar"
import Environment from "./Environment";
// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class LoginPage extends Component {

  env;

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.loginClicked = this.loginClicked.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.env = new Environment();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleKeyPress(e) {
    //13 is the char code for enter
    if (e.charCode === 13) {
      this.loginClicked(e);
    }
  }

  loginClicked(e) {
    e.preventDefault();
    try {
      var url = this.env.getRootUrl() + "/api-auth/auth/";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          "email_address": this.state.username,
          "password": this.state.password
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((results) => {
          if ("tokens" in results) {
            sessionStorage.setItem("refreshToken", results.tokens.refresh);
            sessionStorage.setItem("accessToken", results.tokens.access);
            if (results.user.email_address) {
              sessionStorage.setItem("email", results.user.email_address);
              this.props.history.push({
                pathname: '/Calendar',
                state: { email: results.user.email_address }
              })
            }
          }
          else {
            toastr.error('Error', 'Incorrect username or password. Please try again.');
          }
        });
    } catch (error) {
      console.log(error);
      console.log("--------------------------");
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("refreshToken")) {
      this.props.history.push({
        pathname: '/Calendar'
      });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <Menubar />
        <Container className="background_login" fluid>
          <Form onSubmit={this.loginClicked} onKeyPress={this.handleKeyPress}>
            <Row className="justify-content-md-center">
              <Col >
                <Image src="/Recess_logo.png" fluid />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} xs={12}   >
                <Form.Group controlId="emailFormGroup">
                  <Form.Control
                    type="email"
                    name="username"
                    value={username}
                    className="username"
                    onChange={this.onChange}
                    style={{ height: 65 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} xs={12} >
                <Form.Group controlId="passwordFormGroup">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    className="password"
                    onChange={this.onChange}
                    style={{ height: 65 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={5} xs={12}>
                <Button variant="primary" className="Submit_Login" onClick={this.loginClicked}></Button>
              </Col>
            </Row>
          </Form>
          <Row className="justify-content-md-center">
            <Col md={5} xs={12}>
              <Button variant="link" className="forgotPassword" href="/ForgotPassword">"Forgot your password?"</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default LoginPage;
