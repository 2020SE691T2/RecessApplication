import React, { Component, createRef } from "react";
import './ProfilePage.css'
import Menubar from "./MenuBar"
import RefreshToken from "../RefreshToken"
import Environment from "./Environment";
// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { PencilSquare } from 'react-bootstrap-icons';
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import * as Ladda from 'ladda';


class ProfilePage extends Component {

    env;
    laddaButton;
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

        this.hiddenFileInput = createRef()
        this.editFirstName = this.editFirstName.bind(this);
        this.editLastName = this.editLastName.bind(this);
        this.editPreferredName = this.editPreferredName.bind(this);
        this.editDoB = this.editDoB.bind(this);
        this.editIdNum = this.editIdNum.bind(this);
        this.editProfilePicture = this.editProfilePicture.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.env = new Environment();
    }

    componentDidMount() {
        this.laddaButton = Ladda.create(document.querySelector('#saveButton'));
        try {
            var url = this.env.getRootUrl() + "/users/" + sessionStorage.getItem("email");
            fetch(url, {
                method: "GET",
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
                })
            })
                .then((resp) => resp.json())
                .then((results) => {
                    if (RefreshToken(results)) {
                        this.setState({
                            firstName: results.first_name,
                            lastName: results.last_name,
                            preferredName: results.preferred_name,
                            email: results.email_address,
                            dob: results.dob,
                            idNum: results.physical_id_num,
                            photo: results.photo
                        });
                    }
                    else {
                        toastr.error('Error', "Failed to get profile.\nPlease log in again.")
                    }
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
            this.laddaButton.start();
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
                "photo": this.state.photo,
            });
            var url = this.env.getRootUrl() + "/users/" + this.state.email;
            fetch(url, {
                method: "PATCH",
                body: json,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
                }
            }).then((resp) => resp.json())
                .then((results) => {
                    if (RefreshToken(results)) {
                        this.laddaButton.stop();
                        this.setState({
                            firstName: results.first_name,
                            lastName: results.last_name,
                            preferredName: results.preferred_name,
                            email: results.email_address,
                            dob: results.dob,
                            idNum: results.physical_id_num,
                            photo: results.photo
                        });
                    }
                    else {
                        this.laddaButton.stop();
                        toastr.error('Error', "Failed to update profile.  Please try again.");
                    }
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

    editDoB(event) {
        this.setState({ dob: event.target.value });
    }

    editIdNum(event) {
        this.setState({ idNum: event.target.value });
    }

    onButtonClicked(event) {
        this.hiddenFileInput.current.click();
    }

    editProfilePicture(event) {
        var files = document.getElementById('file').files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);

        const scope = this;
        reader.onload = function () {
            scope.setState({ photo: reader.result });
        };
    }

    render() {
        return (
            <div>
                <Menubar />
                <Container fluid className={'backgroundProfilePage'}>
                    <br />
                    <Row className="justify-content-md-center">
                        <Col>
                            <Image src={this.state.photo} fluid alt={'Profile Picture'} style={{ height: '150px', width: '150px' }} />
                            <Button className={this.state.disabled ? 'invisible' : 'visible'} onClick={this.onButtonClicked}>
                                <PencilSquare />
                                <Form.Control
                                    name="profilePicture"
                                    className="fileInput"
                                    ref={this.hiddenFileInput}
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={this.editProfilePicture}
                                />
                            </Button>
                        </Col>
                    </Row>
                    <Form onSubmit={this.onFormSubmitted}>
                        <Row className="justify-content-md-center">
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="fnameFormGroup">
                                    <Form.Label className="textLabelProfilePage">First Name:</Form.Label>
                                    <Form.Control type="text" name="firstNameInput" disabled={this.state.disabled} value={this.state.firstName} onChange={this.editFirstName} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="lnameFormGroup">
                                    <Form.Label className="textLabelProfilePage">Last Name:</Form.Label>
                                    <Form.Control type="text" name="lastNameInput" disabled={this.state.disabled} value={this.state.lastName} onChange={this.editLastName} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="pnameFormGroup">
                                    <Form.Label className="textLabelProfilePage">Prefered Name:</Form.Label>
                                    <Form.Control type="text" name="preferredNameInput" disabled={this.state.disabled} value={this.state.preferredName} onChange={this.editPreferredName} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="emailFormGroup">
                                    <Form.Label className="textLabelProfilePage">Email Address:</Form.Label>
                                    <Form.Control type="text" name="emailInput" value={this.state.email} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="dobFormGroup">
                                    <Form.Label className="textLabelProfilePage">Date of Birth:</Form.Label>
                                    <Form.Control type="date" name="dobInput" disabled={this.state.disabled} value={this.state.dob} onChange={this.editDoB} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={5}>
                                <Form.Group controlId="idFormGroup">
                                    <Form.Label className="textLabelProfilePage">Id Number:</Form.Label>
                                    <Form.Control type="text" name="idNumInput" disabled={this.state.disabled} value={this.state.idNum} onChange={this.editIdNum} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} lg={10}>
                                <Button variant="light" id="editButton" className="profileButton" style={{ visibility: "visible" }} onClick={this.onFormSubmitted}>Edit</Button>
                            </Col>
                            <Col xs={12} lg={10}>
                                <Button variant="light" id="saveButton" className="profileButton ladda-button" data-style="zoom-in" data-spinner-color="#000" style={{ visibility: "hidden" }} onClick={this.onFormSubmitted}>
                                    <span className="ladda-label">Save</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default ProfilePage;