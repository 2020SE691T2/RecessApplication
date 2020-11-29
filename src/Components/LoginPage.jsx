import React, { Component } from "react";
import "./LoginApp.css";
import Menubar from "./MenuBar"

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import toastr from 'toastr'
import 'toastr/build/toastr.css'

class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.loginClicked = this.loginClicked.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
      var url = "https://recess-api.herokuapp.com/api-auth/auth/";
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
                pathname: '/Profile',
                state: { email: results.user.email_address }
              })
            }
          }
          else {
            toastr.options = {
              "closeButton": true
            }
            toastr.error('Incorrect username or password. Please try again.', 'Error');
          }
        });
    } catch (error) {
      console.log(error);
      console.log("--------------------------");
    }
  }

  render() {

    const { username, password } = this.state;
    return (
      <div>
        <Menubar />
        <Container className="background" fluid>
          <Form onSubmit={this.loginClicked} onKeyPress={this.handleKeyPress}>
            <div className="logo">
              <Row>

                <Col >

                  <Image src="/Recess_logo.png" fluid />

                </Col>
              </Row>
            </div>

            <Row >
              <Col md={5} xs={8}   >
                <Form.Group controlId="emailFormGroup">
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    className="username"
                    onChange={this.onChange}
                    style={{ height: 65 }}



                  />
                </Form.Group>
              </Col>
            </Row>
            <Row >
              <Col md={5} xs={8} >
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
            <Row>
              <Col>
                <Button variant="primary" className="Submit_Login" onClick={this.loginClicked}></Button>
              </Col>
            </Row>
          </Form>
          <Button variant="link" className="forgotPassword" href="#">"Forgot your password?"</Button>
        </Container>
      </div>
    );
  }
}
export default LoginPage;
