module.exports = (min, max, decimals = config.decimals) => {
    const value = generateRandomValue(min, max, decimals);
    return value;
}

const generateRandomValue = (min, max, decimals) => {
    // Generate an integer in the range [min * 10^decimalPlaces, max * 10^decimalPlaces]
    const factor = Math.pow(10, decimals);
    const randomInt = Math.floor(Math.random() * (max * factor - min * factor) + min * factor);
    // Divide the integer by the factor to get a float with the desired number of decimal places
    return (randomInt / factor);
};