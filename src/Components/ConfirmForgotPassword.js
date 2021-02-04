import React, { Component } from "react";
import './ConfirmForgotPassword.css'
import Menubar from "./MenuBar"
import Environment from "./Environment";
// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class ConfirmForgotPassword extends Component {

    env;
    constructor() {
        super();
        this.state = {
            token: "",
            password: ""
        };

        this.editToken = this.editToken.bind(this);
        this.editPassword = this.editPassword.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.env = new Environment();
    }

    editToken(event) {
        this.setState({ token: event.target.value });
    }

    editPassword(event) {
        this.setState({ password: event.target.value });
    }

    onFormSubmitted(e) {
        e.preventDefault();
        var json = JSON.stringify({
            "token": this.state.token,
            "password": this.state.password
        });
        var url = this.env.getRootUrl() + "/api/password_reset/confirm/";
        fetch(url, {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resp) => resp.json())
            .then((results) => {
                this.setState({ password: '' });
                if (results.code === 200) {
                    toastr.success('Password Updated');
                    this.props.history.push({
                        pathname: '/Calendar'
                    });
                } else {
                    toastr.error('Error', "Failed to update password. Please ensure token is correct.");
                }
            });
    }

    render() {
        return (
            <div>
                <Menubar />
                <Container fluid className={'background'}>
                    <Container>
                        <Form onSubmit={this.onFormSubmitted}>
                            <br />
                            <Row className="justify-content-md-center">
                                <Col xs={12} lg={6}>
                                    <h2 className="textLabel">Check your email for your token</h2>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col xs={12} lg={6}>
                                    <Form.Group controlId="tokenFormGroup">
                                        <Form.Label className="textLabel">Token:</Form.Label>
                                        <Form.Control type="text" name="tokenInput" value={this.state.token} onChange={this.editToken} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <Form.Group controlId="passwordFormGroup">
                                        <Form.Label className="textLabel">New Password:</Form.Label>
                                        <Form.Control type="password" name="passwordInput" value={this.state.password} onChange={this.editPassword} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col xs={12}>
                                    <Button block variant="success" id="saveButton" onClick={this.onFormSubmitted}>Update Password</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Container>
            </div>
        );
    }
}
export default ConfirmForgotPassword;