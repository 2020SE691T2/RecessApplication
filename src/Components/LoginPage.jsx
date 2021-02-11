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
import StoreSessionKeys from "../StoreSessionKeys";

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
          StoreSessionKeys(this, results, 'Incorrect username or password. Please try again.', '/Calendar');
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
                    className="login"
                    placeholder="Email"
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
                    className="login"
                    placeholder="Password"
                    onChange={this.onChange}
                    style={{ height: 65 }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Button variant="light" className="Submit_Login" onClick={this.loginClicked}>Login</Button>
            </Row>
          </Form>
          <br/>
          <Row className="justify-content-md-center">
              <Button variant="link" className="forgotPassword" href="/ForgotPassword">"Forgot your password?"</Button>
          </Row>
        </Container>
      </div>
    );
  }
}
export default LoginPage;
