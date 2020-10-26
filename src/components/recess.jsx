import React, { Component } from "react";
import "/Users/pinkdove/RecessApplication/gui/src/LoginApp.css";
import axios from "axios";

class Recess2 extends Component {

  constructor(){
    super();
  this.state = {
    username: '',
    password: '',
  };

}

onChange = (e) =>{
this.setState({ [e.target.name]: e.target.value});
}


onSubmit = (e) => {
  e.preventDefault();


  const{ username, password } = this.state;


  axios({
    method: 'post',
    url: 'https://recess-api.herokuapp.com/api-auth/auth/',
    data: {
      email_address: username,
      password: password
    }
  });

  //get form data out of state

 
}






  render() {

    const {username, password} = this.state;
    return (
      <div className="container">
        <body className="background">
          <form>
            <input
              className="username"
              type="text"
              name = "username"
              value={username}
              onChange={this.onChange}
            />

            <input
              className="password"
              type="password"
              name = "password"
              value={password}
              onChange={this.onChange}
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
