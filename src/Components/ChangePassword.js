import React, { Component } from "react";
import './ChangePassword.css'
import Menubar from "./MenuBar"
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class ProfilePage extends Component {

    env;
    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: ""
        };

        this.editOldPassword = this.editOldPassword.bind(this);
        this.editNewPassword = this.editNewPassword.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.env = new Environment();
    }

    editOldPassword(event) {
        this.setState({ oldPassword: event.target.value });
    }

    editNewPassword(event) {
        this.setState({ newPassword: event.target.value });
    }

    onFormSubmitted(e) {
        e.preventDefault();
        var json = JSON.stringify({
            "old_password": this.state.oldPassword,
            "new_password": this.state.newPassword
        });
        var url = this.env.getRootUrl() + "/api/change-password/";
        fetch(url, {
            method: "PUT",
            body: json,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }
        }).then((resp) => resp.json())
            .then((results) => {
                if (RefreshToken(results)) {
                    this.setState({oldPassword: ''});
                    this.setState({newPassword: ''});
                    if (results.code === 200 ) {
                        toastr.success('Password Changed');
                        this.props.history.push({
                            pathname: '/Profile'
                        });
                    } else {
                        toastr.error('Error', "Failed to change password. Please ensure old password is correct.");
                    }
                }
                else {
                    toastr.error('Error', "Failed to change password.  Please try again.");
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
                            <Row>
                                <Col xs={12} lg={6}>
                                    <Form.Group controlId="dobFormGroup">
                                        <Form.Label className="textLabel">Old Password:</Form.Label>
                                        <Form.Control type="text" name="oldPasswordInput" value={this.state.oldPassword} onChange={this.editOldPassword} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <Form.Group controlId="idFormGroup">
                                        <Form.Label className="textLabel">New Password:</Form.Label>
                                        <Form.Control type="text" name="newPasswordInput" value={this.state.newPassword} onChange={this.editNewPassword} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Button block variant="success" id="saveButton" onClick={this.onFormSubmitted}>Change Password</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Container>
            </div>
        );
    }
}
export default ProfilePage;