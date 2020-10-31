import React, { Component } from "react";
import "./LoginApp.css";

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
    const { username, password } = this.state;

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
    } catch (e) {
      console.log(e);
      console.log("--------------------------");
    }
  }

  render() {

    const { username, password } = this.state;
    return (
      <div className="container">
        <body className="background">
          <form onSubmit={this.loginClicked}>
            <input
              className="username"
              type="text"
              name="username"
              value={username}
              onChange={this.onChange}
            />

            <input
              className="password"
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            <input type="submit" className="Submit_login" value="" />

          </form>

          <p>
            <a href="#" className="forgotPassword">
              "Forgot your password?"
            </a>
          </p>
        </body>
      </div>
    );
  }
}
export default LoginPage;