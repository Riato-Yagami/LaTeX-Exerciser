module.exports = (numerator, denominator) => {
    if (denominator === undefined) { // handle args passed as {numerator, denominator}
        denominator = numerator.denominator;
        numerator = numerator.numerator;
    }

    const fraction = simplify(numerator, denominator);
    return fraction;
}

const simplify = (numerator, denominator) => {
    const gcd = fun.gcd(numerator, denominator);  // Find the greatest common divisor
    return {
        numerator: numerator / gcd,
        denominator: denominator / gcd
    };
}
