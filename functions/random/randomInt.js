module.exports = (max) => {
    const value = getRandomInt(max)
    // console.log(value)
    return value;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}