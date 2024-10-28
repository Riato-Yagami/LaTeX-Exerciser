module.exports = (min, max) => {
    // If only one argument is provided, treat it as max
    if (max === undefined) {
        max = min;
        min = 0;
    }
    
    const value = getRandomInt(min, max);
    return value;
}

function getRandomInt(min, max) { // max included
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}
