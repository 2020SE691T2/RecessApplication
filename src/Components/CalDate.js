import React from "react";
import "./CalDate.css";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class CalDate extends React.Component {

    
    render(){


        const d = new Date()
        const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        const day = weekDay [d.getDay()]
        const month = months[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()

        const currentDate =day + ", " + month + ", " + date + ", " + year

        const hours = d.getHours();
        const minutes = d.getMinutes();

        const currentTime = hours+ ":" + minutes 

        if(day == "Tuesday"){

            document.getElementById("date_color").className = "Tuesday";

        }




    return(
<div className = 'main'>
<div className = 'cal_date'>

  
<Row> 

    <Col>
<h3 id="date_color">{currentDate}   </h3>
</Col>

<Col>
<h3>{currentTime} </h3>
</Col>
</Row>


           
</div>
</div>


    );

    
}
}
    export default CalDate;

