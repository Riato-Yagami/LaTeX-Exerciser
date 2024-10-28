module.exports = (value, ratio, nearly = false) => {
    const proportionalValue = get(value, ratio, nearly)
    // console.log(proportionalValue)
    return proportionalValue;
}

const get = (value, ratio, nearly) => {
    const variation = nearly? fun.randomValue(0.1,0.5) : 0
    // console.log(variation)
    const proportionalValue = fun.roundValue(value * (Number(ratio) + Number(variation)))
    return proportionalValue;
}