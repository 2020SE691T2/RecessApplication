import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import "./RosterEntry.css";

class RosterEntry extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        document.getElementById(this.props.name).innerText = this.props.name;
    }
    render() {
        return (
            <div className="txtInputButton flex">
                <p className="form-control form-control-sm inputBox" type="text" id={this.props.name} disabled />
                <button type="button" class="btn"><Image className="xButton" src="./x.png" /></button>
            </div>
        );
    }
}
export default RosterEntry;