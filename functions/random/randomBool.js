module.exports = () => {
    const value = get()
    // console.log(value)
    return value;
}

function get() {
    return 0 == fun.randomInt(2)
}