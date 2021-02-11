import React from "react";
import "./CalDate.css";

// Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CalDate extends React.Component {
    
    constructor() {
        super();
        this.color_change = this.color_change.bind(this);
    }
    
    color_change() {
        
        var d = new Date()
        var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        var day = weekDay[d.getDay()]
        var month = months[d.getMonth()]
        var date = d.getDate()
        var year = d.getFullYear()
        
        var currentDate = day + ", " + month + " " + date + ", " + year
        
        document.getElementById("currentDate").innerText = currentDate;
        
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var timeOfDay = "";
        
        if (hours >= 12 && hours < 24) {
            if (hours >= 13) {
                hours = hours - 12;
            }
            timeOfDay = " PM";
        }
        else {
            if (hours === 24) {
                hours = hours - 12;
            }
            timeOfDay = " AM";
        }
        var currentTime = "";
        if (minutes < 10) {
            currentTime = hours + ":0" + minutes + timeOfDay;
        }
        else {
            currentTime = hours + ":" + minutes + timeOfDay;
        }
        document.getElementById("currentTime").innerText = currentTime;
        
        document.getElementById("currentDate").className = day;
        document.getElementById("currentTime").className = day;
    }
    
    componentDidMount() {
        if (sessionStorage.getItem("refreshToken")) {
            this.color_change();
            setInterval(this.color_change, 3000);
        }
    }
    
    render() {
        return (
            <div className='main'>
                <div className='cal_date'>
                    <Row>
                        <Col>
                            <h3 id="currentDate">  </h3>
                        </Col>
                        <Col>
                            <h3 id="currentTime"> </h3>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default CalDate;

