module.exports = (val, decimals = config.decimals * 2) => {
    const value = roundValue(val, decimals);
    return value;
}

const roundValue = (val, decimals) => {
    return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
}