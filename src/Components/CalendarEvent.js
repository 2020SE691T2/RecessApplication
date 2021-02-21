import React, { Component } from "react";
import "./CalendarEvent.css";

import hourAdjust from "./HourAdjust";
import selectAMPM from "./SelectAMPM";

class CalendarEvent extends Component {

    constructor() {
        super();
        this.formatTime = this.formatTime.bind(this);
    }
    
    formatTime(unformattedTime) {
        unformattedTime = unformattedTime.substring(0, 5);
        var hours = parseInt(unformattedTime.substring(0, 2));
        var timeOfDay = selectAMPM(hours);
        hours = hourAdjust(hours);
        return hours.toString() + unformattedTime.substring(2) + timeOfDay;
    }
    
    componentDidMount() {
        var timeString = this.formatTime(this.props.startTime) + " - " + this.formatTime(this.props.endTime);
        document.getElementById(this.props.className + this.props.day).innerHTML = timeString;
    }
    render() {
        return (
            <div className="event">
                <a href={this.props.link}>
                    <p id={this.props.className + this.props.day}></p>
                    <h5>{this.props.className}</h5>
                </a>
            </div>
        );
    }
}
export default CalendarEvent;