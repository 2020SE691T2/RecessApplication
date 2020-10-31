import React, { Component } from "react";
import "./CreateAccount.css";

class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      preferredName: '',
      email: '',
      birthday: '',
      password: ''
    };

    this.changefirstName = this.changefirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changePreferredName = this.changePreferredName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeBirthday = this.changeBirthday.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.creatAccount = this.creatAccount.bind(this);

  }

  changefirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  changeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  changePreferredName(event) {
    this.setState({ preferredName: event.target.value });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeBirthday(event) {
    this.setState({ birthday: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  creatAccount(event) {
    event.preventDefault();
    var json = JSON.stringify({
      "email_address": this.state.email,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "preferred_name": this.state.preferredName,
      "password": this.state.password,
      "physical_id_num": "1",
      "dob": this.state.birthday,
      "role": "Teacher"
    });
    try {
      fetch("https://recess-api.herokuapp.com/users/", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((resp) => resp.json())
        .then((results) => {
          console.log(results);
          if (results.email_address) {
            this.props.history.push({
              pathname: '/Profile',
              state: { email: results.email_address }
            })
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {

    const { firstName, lastName, email, birthday, prefferedName, password } = this.state;
    return (
      <div className="container">
        <body className="background_CA">




          <div className="header">
            <p> <a href="/"> <img src="./Recess_logo.png" /></a>
            </p>

          </div>



          <div className="banner"> <p> <img src="./signupbanner.png" /></p> </div>





          <form onSubmit={this.creatAccount}>




            <input
              className="firstName"
              type="text"
              placeholder="First Name:"
              value={this.state.firstName}
              onChange={this.changefirstName}
            />


            <input
              className="lastName"
              type="text"
              placeholder="Last Name:"
              value={this.state.lastName}
              onChange={this.changeLastName}
            />

            <p></p>
            <p></p>


            <input
              className="email"
              type="text"
              placeholder="Email:"
              value={this.state.email}
              onChange={this.changeEmail}
            />

            <input
              className="preferredName"
              type="text"
              placeholder="Preffered Name:"
              value={this.state.prefferedName}
              onChange={this.changePreferredName}
            />
            <p></p>
            <p></p>

            <input
              className="birthday"
              type="text"
              placeholder="Date of Birth"
              value={this.state.birthday}
              onChange={this.changeBirthday}
            />

            <input
              className="password_CA"
              type="password"
              placeholder="Password:"
              value={this.state.password}
              onChange={this.changePassword}
            />
            <p></p>
            <p></p>
            <input className="Submit_CA" type="submit" value="" />

          </form>






        </body>
      </div>
    );
  }
}
export default CreateAccount;


