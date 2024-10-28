// function Fraction(numerator,denominator) {
//     this.n = numerator; this.d = denominator;
// }

class Fraction {
    constructor(numerator = 1, denominator = 1) {
        this.n = numerator; this.d = denominator;
    }
}

Fraction.prototype.add = function(x){
    this.n = x.n * this.d + this.n * x.d;
    this.d *= x.d;
}

Fraction.prototype.substract = function(x){
    this.add(x.aInverse());
}

Fraction.prototype.multiply = function(x){
    this.n *= x.n;
    this.d *= x.d;
}

Fraction.prototype.divide = function(x){
    this.multiply(x.mInverse());
}

Fraction.prototype.aInverse = function(){
    return new Fraction(-this.n,this.d)
}

Fraction.prototype.mInverse = function(){
    return new Fraction(this.d,this.n)
}

Fraction.prototype.simplify = function(){
    const gcd = fun.gcd(this.n, this.d);  // Find the greatest common divisor
    this.n /= gcd; this.d /= gcd
}

Fraction.prototype.isDecimal = function(){
    let temp = this.copy()
    temp.simplify()
    const denominatorPrimalDecomposition = fun.primalDecomposition(temp.d);  // Get prime factors of the denominator
    // Check if the denominator's prime decomposition contains only 2 and 5
    return denominatorPrimalDecomposition.every(factor => factor === 2 || factor === 5);
}

Fraction.prototype.copy = function(){
    return new Fraction(this.n,this.d)
}

Fraction.prototype.print = function(){
    return `${this.n} / ${this.d}`
}


// const a = new Fraction(3,9)

// console.log(a)

module.exports = Fraction;
