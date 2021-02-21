import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import "./RosterEntry.css";

class RosterEntry extends Component {

    constructor() {
        super();
        this.xButtonClicked = this.xButtonClicked.bind(this);
    }

    xButtonClicked() {
        var id = "rosterEntry" + this.props.name;
        document.getElementById(id).remove();
    }

    componentDidMount() {
        document.getElementById(this.props.name).innerText = this.props.name;
    }
    render() {
        return (
            <div className="txtInputButton flex" id={"rosterEntry" + this.props.name}>
                <p className="inputBox" type="text" id={this.props.name} disabled />
                <button type="button" className="btn">
                    <Image className="xButton" src="./x.png" onClick={this.xButtonClicked} />
                </button>
            </div >
        );
    }
}
export default RosterEntry;