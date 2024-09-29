module.exports = (factors) => {
    return product(factors);
}

const product = (factors) => {
    result = 1
    factors.forEach(factor => {
        result *= factor
    });
    return result
}