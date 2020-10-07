import React, { Component } from "react";
import "/Users/pinkdove/recess2-app/src/App.css";

class Recess2 extends Component {
  state = {
    username: "John",
    password_changelater: "",
  };

  render() {
    return (
      <div className="container">
        <body className="background">
          <form>
            <input
              className="username"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <input
              className="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input className="Submit" type="submit" value="" />
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
