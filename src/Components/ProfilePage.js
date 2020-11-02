import React, { Component } from "react";
import './ProfilePage.css'

class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            disabled: true,
            firstName: "",
            lastName: "",
            preferedName: "",
            email: "",
            dob: "",
            idNum: "",
            photo: ""
        };

        this.editFirstName = this.editFirstName.bind(this);
        this.editLastName = this.editLastName.bind(this);
        this.editPreferedName = this.editPreferedName.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.editDoB = this.editDoB.bind(this);
        this.editIdNum = this.editIdNum.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
    }

    componentDidMount() {
        try {
            var url = "https://recess-api.herokuapp.com/users/" + this.props.location.state.email + "/";
            fetch(url, {
                method: "GET"
            })
                .then((resp) => resp.json())
                .then((results) => {
                    this.setState({
                        firstName: results.first_name,
                        lastName: results.last_name,
                        preferedName: results.preferred_name,
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

            // try {
            //     var url = "https://recess-api.herokuapp.com/users/gtkzzwmewi.jugdsisti@schoolmail.com/";
            //     fetch(url, {
            //         method: "PUT",
            //         body: JSON.stringify({
            //             first_name: this.state.firstName,
            //             last_name: this.state.lastName,
            //             preferred_name: this.state.preferedName,
            //             email_address: this.state.email,
            //             dob: this.state.dob,
            //             physical_id_num: this.state.idNum
            //         }),
            //         headers: {
            //             Accept: "application/json",
            //             "Content-Type": "application/json"
            //         }
            //     })
            //         .then((resp) => resp.json())
            //         .then((results) => {
            //             this.setState({
            //                 firstName: results.first_name,
            //                 lastName: results.last_name,
            //                 preferedName: results.preferred_name,
            //                 email: results.email_address,
            //                 dob: results.dob,
            //                 idNum: results.physical_id_num,
            //             });
            //         });
            // } catch (e) {
            //     console.log(e);
            //     console.log("--------------------------");
            // }
        }
    }

    editFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    editLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    editPreferedName(event) {
        this.setState({ preferedName: event.target.value });
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
            <body className="backgroundProfilePage">
                <div className="viewSpace">
                    <img style={{ margin: "10px", width: "180px", height: "180px", borderRadius: "90px", backgroundColor: "black" }} src={this.state.photo}></img>
                    <form onSubmit={this.onFormSubmitted}>
                        <label className="textLabel">First Name:
                        </label>
                        <input type="text" name="firstNameInput" disabled={this.state.disabled} value={this.state.firstName} onChange={this.editFirstName} />
                        <br />
                        <br />
                        <label className="textLabel">Last Name:
                        </label>
                        <input type="text" name="lastNameInput" disabled={this.state.disabled} value={this.state.lastName} onChange={this.editLastName} />
                        <br />
                        <br />
                        <label className="textLabel">Prefered Name:
                        </label>
                        <input type="text" name="preferedNameInput" disabled={this.state.disabled} value={this.state.preferedName} onChange={this.editPreferedName} />
                        <br />
                        <br />
                        <label className="textLabel">Email Address:
                        </label>
                        <input type="text" name="emailInput" disabled={this.state.disabled} value={this.state.email} onChange={this.editEmail} />
                        <br />
                        <br />
                        <label className="textLabel">Date of Birth:
                        </label>
                        <input type="text" name="dobInput" disabled={this.state.disabled} value={this.state.dob} onChange={this.editDoB} />
                        <br />
                        <br />
                        <label className="textLabel">Id Number:
                        </label>
                        <input type="text" name="idNumInput" disabled={this.state.disabled} value={this.state.idNum} onChange={this.editIdNum} />
                        <br />
                        <br />
                        <input id="editButton" type="submit" value="Edit Profile" style={{ visibility: "visible" }} />
                        <input id="saveButton" type="submit" value="Save Profile" style={{ visibility: "hidden" }} />
                    </form>
                </div>
            </body >
        );
    }
}
export default ProfilePage;