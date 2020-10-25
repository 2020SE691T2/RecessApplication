import React, { Component } from "react";
import './ProfilePage.css'

class ProfilePage extends Component {
    constructor() {
        super();

        //pull the profile info from the api and set that as the 
        //initial values

        this.state = {
            disabled: true,
            firstName: "",
            lastName: "",
            preferedName: "",
            email: "",
            dob: "",
            idNum: ""
        };

        this.onEditProfileButtonClicked = this.onEditProfileButtonClicked.bind(this);
        this.onSaveProfileButtonClicked = this.onSaveProfileButtonClicked.bind(this);
        this.editFirstName = this.editFirstName.bind(this);
        this.editLastName = this.editLastName.bind(this);
        this.editPreferedName = this.editPreferedName.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.editDoB = this.editDoB.bind(this);
        this.editIdNum = this.editIdNum.bind(this);
    }

    onEditProfileButtonClicked() {
        this.setState({
            disabled: false
        });
    }

    onSaveProfileButtonClicked() {
        this.setState({
            disabled: true
        });
        //call the put method to update the db with the updated profile info
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
            <body className="background">
                <div className="viewSpace">
                    <img style={{ margin: "10px", width: "180px", height: "180px", borderRadius: "90px", backgroundColor: "black" }}></img>
                    <form>
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
                        <button type="button" disabled={!this.state.disabled} onClick={this.onEditProfileButtonClicked}>Edit Profile</button>
                        <button type="button" disabled={this.state.disabled} onClick={this.onSaveProfileButtonClicked}>Save Profile</button>
                    </form>
                </div>
            </body >
        );
    }
}
export default ProfilePage;