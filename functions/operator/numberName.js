module.exports = (n) => {
    const numberName = get(n);
    return numberName;
}

const get = (n) => {
    switch (n) {
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        case 6: return "six";
        case 7: return "seven";
        case 8: return "eight";
        case 9: return "nine";
        default: return "invalid number";  // Handle numbers outside the range 1-9
    }
}
