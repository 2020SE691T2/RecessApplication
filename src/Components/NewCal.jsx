import React, { Component } from "react";
import "./NewCal.css";
import Menubar from "./MenuBar";
import CalDate from "./CalDate";

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';



class NewCal extends Component {
    


render() {

    
    return (
      <div>
        <Menubar />
        <Container className= "backgroundNewCal" fluid>

<div className="date">



    <Row>

    <Col>
                <h2>Boris's Weekly Class Calendar</h2>
                
                
                </Col>
    </Row>
            <Row>

                <Col>
                <div className="calDateColor">
                
              
            <CalDate />
            
                </div>
                
                </Col>


                
            </Row>

            </div>

            <div>
                <p></p>
            </div>
<Row>

    <Col>

    <h3>Monday</h3>
            <div className = "box1"> 

            <p>8:00 am - 10:00 am</p>
            <h5> Classtime</h5>

            
            </div>

            </Col>

            <Col>

            <h3>Tuesday</h3>
            <div className = "box2"> 

            
            </div>

            </Col>

            <Col>

            <h3>Wednesday</h3>
            <div className = "box3"> 

            
            </div>

            </Col>

            <Col>
            <h3> Thursday</h3>
            <div className = "box4"> 

            
            </div>

            </Col>


            <Col>
            <h3> Friday</h3>
            <div className = "box5"> 

            
            </div>

            </Col>

            </Row>
        </Container >

      
        </div>

        
    );
}
}
export default NewCal;