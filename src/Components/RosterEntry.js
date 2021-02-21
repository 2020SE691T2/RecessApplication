import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import "./RosterEntry.css";

class RosterEntry extends Component {

    constructor() {
        super();
        this.xButtonClicked = this.xButtonClicked.bind(this);
    }

    xButtonClicked() {
        document.getElementById("rosterEntry").remove();
    }

    componentDidMount() {
        document.getElementById(this.props.name).innerText = this.props.name;
    }
    render() {
        return (
            <div className="txtInputButton flex" id="rosterEntry">
                <p className="form-control form-control-sm inputBox" type="text" id={this.props.name} disabled />
                <button type="button" class="btn"><Image className="xButton" src="./x.png" onClick={this.xButtonClicked} /></button>
            </div>
        );
    }
}
export default RosterEntry;