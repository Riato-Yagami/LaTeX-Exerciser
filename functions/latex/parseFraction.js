module.exports = (numerator,denominator) => {
    if (denominator === undefined) { // handle args passed as {numerator, denominator}
        denominator = numerator.denominator;
        numerator = numerator.numerator;
    }

    const fraction = parse(numerator,denominator)
    return fraction
}

const signBeforeFraction = true

const parse = (numerator,denominator) => {
    let sign = ''
    if(signBeforeFraction){
        if(numerator * denominator < 0){sign = "-"}
        numerator = Math.abs(numerator)
        denominator = Math.abs(denominator)
    }
    return `${sign}\\frac{${
        numerator
    }}{${
        denominator
    }}`;
}