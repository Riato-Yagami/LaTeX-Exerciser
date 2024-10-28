module.exports = (a, b) => {
    const gcd = get(a, b);
    return gcd;
}

// Helper function to find the greatest common divisor (GCD)
const get = (a, b) => {
    if (!b) {
        return Math.abs(a);  // If b is 0, return the absolute value of a
    }
    return get(b, a % b);  // Recursive call to find the GCD
}