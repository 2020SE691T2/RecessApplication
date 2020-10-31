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

    this.handleChange = this.handleChange.bind(this);
    this.creatAccount = this.creatAccount.bind(this);

  }

  handleChange(event) {
    this.setState({ firstName: event.target.firstName })
    this.setState({ lastName: event.target.lastName })
    this.setState({ prefferedName: event.target.preferredName })
    this.setState({ email: event.target.email })
    this.setState({ birthday: event.target.birthday })
    this.setState({ password: event.target.password })
  }

  creatAccount(event) {
    event.preventDefault();
    console.log(this.state);
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
    console.log(json);
    try {
      fetch("https://recess-api.herokuapp.com/users/", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((resp) => resp.json())
        .then((results) => {
          if (results.user.email_address) {
            this.props.history.push({
              pathname: '/Profile',
              state: { email: results.user.email_address }
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
            <p> <a href="https://recess-prototype.herokuapp.com/" target="_blank"> <img src="./Recess_logo.png" /></a>
            </p>

          </div>



          <div className="banner"> <p> <img src="./signupbanner.png" /></p> </div>





          <form onSubmit={this.creatAccount}>




            <input
              className="firstName"
              type="text"
              placeholder="First Name:"
              value={this.state.firstName}
              onChange={this.handleChange}
            />


            <input
              className="lastName"
              type="text"
              placeholder="Last Name:"
              value={this.state.lastName}
              onChange={this.handleChange}
            />

            <p></p>
            <p></p>


            <input
              className="email"
              type="text"
              placeholder="Email:"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              className="preferredName"
              type="text"
              placeholder="Preffered Name:"
              value={this.state.prefferedName}
              onChange={this.handleChange}
            />
            <p></p>
            <p></p>

            <input
              className="birthday"
              type="text"
              placeholder="Date of Birth"
              value={this.state.birthday}
              onChange={this.handleChange}
            />

            <input
              className="password_CA"
              type="password"
              placeholder="Password:"
              value={this.state.password}
              onChange={this.handleChange}
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


