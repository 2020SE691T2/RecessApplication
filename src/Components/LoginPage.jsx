import React, { Component } from "react";
import "./LoginApp.css";
import Menubar from "./MenuBar"

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.loginClicked = this.loginClicked.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginClicked(e) {
    e.preventDefault();

    try {
      var url = "https://recess-api.herokuapp.com/api-auth/auth/";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email_address: this.state.username,
          password: this.state.password
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((results) => {
          if (results.user.email_address) {
            this.props.history.push({
              pathname: '/Profile',
              state: { email: results.user.email_address }
            })
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
            <Form onSubmit={this.loginClicked}>
            <Row>
              <Col>
                <Form.Group controlId="emailFormGroup">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    className="username"
                    onChange={this.onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="passwordFormGroup">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    className="password"
                    onChange={this.onChange}
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
