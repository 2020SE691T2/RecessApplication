import React, { Component } from "react";
import "./ForgotPassword.css";
import Menubar from "./MenuBar"

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';


class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
        };

        this.changeemail= this.changeemail.bind(this);

    }

    changeemail(event) {
        this.setState({ email: event.target.value });
      }


      /* The code below may not be applicable to this program. I wasn't sure. */

     forgotPassword(event) {
        event.preventDefault();
        var json = JSON.stringify({
          "email": this.state.email
        });

        fetch("https://recess-api.herokuapp.com/users/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => resp.json())
      .then((results) => {
        if (results.email_address) {
          this.props.history.push({
            pathname: '/Profile',
            state: { email: results.email_address }
          })
        }
      });

    }

/* Method above needs to be fixed. */


    render(){


        return (
<div>

<Menubar />

<Container className="background_FP" fluid>

<Form onSubmit={this.forgotPassword}>

    <div className = "header">

    <Row>
                <Col>
                   <Image src="./ForgotPasswordBanner.png" alt={'Forgot Password'} fluid />
                </Col>
              </Row>

              <Row>
                <Col>
                   <Image src="./pwlock.png" alt={'Password Image'} fluid />
                </Col>
              </Row>


    </div>
   

<Row >

<Col md={5} >
  <Form.Group controlId="emailFormGroup">
    <Form.Control
      className="forgotPasswordInput"
      name= "email_fp"
      type= "text"
      placeholder="Enter your email here:"
      value={this.state.email}
      onChange={this.changeemail}
      style={{ height: 64 }}
    />
  </Form.Group>

</Col>





</Row>

<Row>

<Col>
  <input className="Submit_FP " type="submit" value="" />

</Col>
</Row >




</Form>
</Container>

</div>

        );
    }
}
export default ForgotPassword;