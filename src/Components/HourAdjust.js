function hourAdjust(hours) {
    
    if (hours >= 12 && hours < 24) {
        if (hours >= 13) {
            return hours - 12;
        }
    }
    else {
        if (hours === 0) {
            return hours + 12;
        }
    }
    return hours;
}

export default hourAdjust;