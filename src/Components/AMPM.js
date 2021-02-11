function AMPM(hours) {
    
    if (hours >= 12 && hours < 24) {
        if (hours >= 13) {
            hours = hours - 12;
        }
        return " PM";
    }
    else {
        if (hours === 0) {
            hours = hours + 12;
        }
        return " AM";
    }
}

export default AMPM;