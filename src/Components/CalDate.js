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

        if (hours > 12) {
            hours = hours - 12;
            timeOfDay = " PM";
        }
        else {
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

        if (day === "Monday") {
            document.getElementById("currentDate").className = "Monday";
            document.getElementById("currentTime").className = "Monday";
        }
        else if (day === "Tuesday") {
            document.getElementById("currentDate").className = "Tuesday";
            document.getElementById("currentTime").className = "Tuesday";
        }
        else if (day === "Wednesday") {
            document.getElementById("currentDate").className = "Wednesday";
            document.getElementById("currentTime").className = "Wednesday";
        }
        else if (day === "Thursday") {
            document.getElementById("currentDate").className = "Thursday";
            document.getElementById("currentTime").className = "Thursday";
        }
        else if (day === "Friday") {
            document.getElementById("currentDate").className = "Friday";
            document.getElementById("currentTime").className = "Friday";
        }
    }

    componentDidMount() {
        this.color_change();
        setInterval(this.color_change, 3000);
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

