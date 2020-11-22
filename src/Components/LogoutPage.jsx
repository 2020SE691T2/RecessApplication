import React, { Component } from "react";

class LogoutPage extends Component {

  componentWillMount() {
    sessionStorage.clear();
  }

  render() {
    window.location.replace("/");
    return false;
  }
}
export default LogoutPage;
