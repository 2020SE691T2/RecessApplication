function selectAMPM(hours) {    
    return (hours >= 12 && hours < 24) ? " PM" : " AM";
}

export default selectAMPM;