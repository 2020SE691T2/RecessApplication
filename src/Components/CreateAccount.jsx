import React, { Component } from "react";
import "/Users/pinkdove/RecessApplication/gui/src/CreateAccount.css";

class CreateAccount extends Component {


  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      preferredName: '',
      email: '',
      birthday:'',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleChange (event) {
    this.setState({firstName: event.target.firstName})
    this.setState({lastName: event.target.lastName})
    this.setState({prefferedName: event.target.preferredName})
    this.setState({email: event.target.email})
    this.setState({birthday: event.target.birthday})
    this.setState({password: event.target.password})
  }
  
 handleSubmit(event){
   event.preventDefault();
 }

  render() {

    const {firstName, lastName, email, birthday, prefferedName, password} = this.state;
    return (
      <div className="container">
        <body className="background">
        
      
        
 
<div className ="header">
         <p> <a href="https://recess-prototype.herokuapp.com/" target = "_blank"> <img src = "./Recess_logo.png"/></a>
         </p>
         
          </div>

     

<div className = "banner"> <p> <img src = "./signupbanner.png"/></p> </div>





        <form>

       
        
          
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
              className= "preferredName"
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
              className= "password"
              type="password"
              placeholder="Password:"
              value={this.state.password}
              onChange={this.handleChange}
            /> 
           <p></p>
<p></p>
             <input className="Submit" type="submit" value="" />     
            
          </form>  

    
           


          
        </body>
      </div>
    );
  }
}
export default CreateAccount;


