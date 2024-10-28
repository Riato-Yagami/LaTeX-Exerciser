module.exports = (fraction) => {
    const isDecimal = get(fraction);
    return isDecimal;
}

const get = (fraction) => {
    const simplifiedFraction = fun.simplifyFraction(fraction);  // Simplify the fraction
    const denominatorPrimalDecomposition = fun.primalDecomposition(simplifiedFraction.denominator);  // Get prime factors of the denominator
    console.log(simplifiedFraction.denominator)
    console.log(denominatorPrimalDecomposition)
    // Check if the denominator's prime decomposition contains only 2 and 5
    return denominatorPrimalDecomposition.every(factor => factor === 2 || factor === 5);
}
