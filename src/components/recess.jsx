import React, { Component } from "react";
import "../LoginApp.css";


class Recess2 extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.loginClicked = this.loginClicked.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginClicked() {
    console.log("in loginClicked");
    const { username, password } = this.state;


    console.log(this.state.username);
    console.log(this.state.password);

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
          //go to the profilepage
        });
    } catch (e) {
      console.log(e);
      console.log("--------------------------");
    }
  }


  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const { username, password } = this.state;
  //   axios({
  //     method: 'post',
  //     url: 'https://recess-api.herokuapp.com/api-auth/auth/',
  //     data: {
  //       email_address: username,
  //       password: password
  //     }
  //   });
  //   //get form data out of state
  //   return false;
  // }






  render() {

    const { username, password } = this.state;
    return (
      <div className="container">
        <body className="background">
          <form>
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
            {/* <input className="Submit" type="submit" value="" /> */}
            <button className="Submit" type="button" onClick={this.loginClicked} />

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
export default Recess2;

/*







*/
