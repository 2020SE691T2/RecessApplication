import React, { Component } from "react";
import './ProfilePage.css'
import Menubar from "./MenuBar"

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            disabled: true,
            firstName: "",
            lastName: "",
            preferredName: "",
            email: "",
            dob: "",
            idNum: "",
            photo: ""
        };

        this.editFirstName = this.editFirstName.bind(this);
        this.editLastName = this.editLastName.bind(this);
        this.editPreferredName = this.editPreferredName.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.editDoB = this.editDoB.bind(this);
        this.editIdNum = this.editIdNum.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
    }

    componentDidMount() {
        try {
            var url = "http://127.0.0.1:8000/users/" + this.props.location.state.email;
            fetch(url, {
                method: "GET"
            })
                .then((resp) => resp.json())
                .then((results) => {
                    this.setState({
                        firstName: results.first_name,
                        lastName: results.last_name,
                        preferredName: results.preferred_name,
                        email: results.email_address,
                        dob: results.dob,
                        idNum: results.physical_id_num,
                        photo: results.photo
                    });
                });
        } catch (e) {
            console.log(e);
            console.log("--------------------------");
        }
    }

    onFormSubmitted(e) {
        e.preventDefault();
        if (this.state.disabled) {
            this.setState({
                disabled: false
            });
            document.getElementById("editButton").style.visibility = "hidden";
            document.getElementById("saveButton").style.visibility = "visible";
        }
        else {
            this.setState({
                disabled: true
            });
            document.getElementById("editButton").style.visibility = "visible";
            document.getElementById("saveButton").style.visibility = "hidden";

            var json = JSON.stringify({
                "email_address": this.state.email,
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "preferred_name": this.state.preferredName,
                "physical_id_num": this.state.idNum,
                "dob": this.state.dob,
                "photo": this.state.profilePicture,
            });
            var url = "http://127.0.0.1:8000/users/" + this.state.email;
            console.log(json);
            fetch(url, {
                method: "PATCH",
                body: json,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((resp) => resp.json())
                .then((results) => {
                    this.setState({
                        firstName: results.first_name,
                        lastName: results.last_name,
                        preferredName: results.preferred_name,
                        email: results.email_address,
                        dob: results.dob,
                        idNum: results.physical_id_num,
                        photo: results.photo
                    });
                });
        }
    }

    editFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    editLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    editPreferredName(event) {
        this.setState({ preferredName: event.target.value });
    }

    editEmail(event) {
        this.setState({ email: event.target.value });
    }

    editDoB(event) {
        this.setState({ dob: event.target.value });
    }

    editIdNum(event) {
        this.setState({ idNum: event.target.value });

    }
    render() {
        return (
            <div>
                <Menubar />
                <Container fluid className={'backgroundProfilePage'}>
                    <Row>
                        <Col>
                            <Image src={this.state.photo} fluid alt={'Profile Picture'} />
                        </Col>
                    </Row>
                    <Form onSubmit={this.onFormSubmitted}>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="fnameFormGroup">
                                    <Form.Label className="textLabel">First Name:</Form.Label>
                                    <Form.Control type="text" name="firstNameInput" disabled={this.state.disabled} value={this.state.firstName} onChange={this.editFirstName} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="lnameFormGroup">
                                    <Form.Label className="textLabel">Last Name:</Form.Label>
                                    <Form.Control type="text" name="lastNameInput" disabled={this.state.disabled} value={this.state.lastName} onChange={this.editLastName} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="pnameFormGroup">
                                    <Form.Label className="textLabel">Prefered Name:</Form.Label>
                                    <Form.Control type="text" name="preferredNameInput" disabled={this.state.disabled} value={this.state.preferredName} onChange={this.editPreferredName} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="emailFormGroup">
                                    <Form.Label className="textLabel">Email Address:</Form.Label>
                                    <Form.Control type="text" name="emailInput" disabled={this.state.disabled} value={this.state.email} onChange={this.editEmail} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="dobFormGroup">
                                    <Form.Label className="textLabel">Date of Birth:</Form.Label>
                                    <Form.Control type="date" name="dobInput" disabled={this.state.disabled} value={this.state.dob} onChange={this.editDoB} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="idFormGroup">
                                    <Form.Label className="textLabel">Id Number:</Form.Label>
                                    <Form.Control type="text" name="idNumInput" disabled={this.state.disabled} value={this.state.idNum} onChange={this.editIdNum} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Button block id="editButton" style={{ visibility: "visible" }} onClick={this.onFormSubmitted}>Edit</Button>
                            </Col>
                            <Col xs={12}>
                                <Button block variant="success" id="saveButton" style={{ visibility: "hidden" }} onClick={this.onFormSubmitted}>Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default ProfilePage;