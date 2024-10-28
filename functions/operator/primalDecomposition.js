module.exports = (a) => {
    const primalDecomposition = get(Math.abs(a));
    return primalDecomposition;
}

const get = (a) => {
    let primeFactors = [];
    let divisor = 2;

    while (a >= 2) {
        if (a % divisor === 0) {
            primeFactors.push(divisor);  // Add the divisor to the prime factors
            a /= divisor;  // Divide the number by the divisor
        } else {
            divisor++;  // Increment the divisor if it's not a factor
        }
    }

    return primeFactors;
}
