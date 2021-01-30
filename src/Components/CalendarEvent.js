import React, { Component } from "react";
import "./CalendarEvent.css";

class CalendarEvent extends Component {
    render() {
        return (
            <div className="event">
                <a href={this.props.link}>
                    <p>{this.props.startTime} - {this.props.endTime}</p>
                    <h5>{this.props.className}</h5>
                </a>
            </div>
        );
    }
}
export default CalendarEvent;