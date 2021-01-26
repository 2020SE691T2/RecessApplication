import React from "react";
import "./CalDate.css";

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class CalDate extends React.Component {

    constructor(){
        super();
        this.color_change = this.color_change.bind(this);
    }
    

    color_change(){

        const d = new Date()
        const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        const day = weekDay [d.getDay()]
        const month = months[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()

        const currentDate =day + ", " + month + ", " + date + ", " + year

        document.getElementById("date_color").innerText = currentDate;
       

        const hours = d.getHours();
        const minutes = d.getMinutes();

        const currentTime = hours+ ":" + minutes 
        document.getElementById("time_color").innerText = currentTime;

        if(day == "Monday"){

            document.getElementById("date_color").className = "Monday";
           

        }

        if(day == "Tuesday"){

            document.getElementById("date_color").className = "Tuesday";
           
        }

        if(day == "Wednesday"){

            document.getElementById("date_color").className = "Wednesday";
           

        }

        if(day == "Thursday"){

            document.getElementById("date_color").className = "Thursday";
           

        }

        if(day == "Friday"){

            document.getElementById("date_color").className = "Friday";
           

        }


    }


    componentDidMount(){
        this.color_change();
    }

    
    render(){


    return(
<div className = 'main'>
<div className = 'cal_date'>

  
<Row> 

    <Col>
<h3 id="date_color">  </h3>
</Col>

<Col>
<h3 id ="time_color"> </h3>
</Col>
</Row>


           
</div>
</div>


    );

    
}
}
    export default CalDate;

