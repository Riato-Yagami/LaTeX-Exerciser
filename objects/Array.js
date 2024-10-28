Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

Array.prototype.skewRandom = function (skewFactor = 2) {
    // Generate a random number and skew it towards smaller values.
    const randomIndex = Math.floor(Math.pow(Math.random(), skewFactor) * this.length);
    return this[randomIndex];
};

Array.prototype.replace = function (value,remplacement) {
    var index = this.indexOf(value);

    if (index !== -1) {
        this[index] = remplacement;
    }

    return this
}


Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];  // Swap elements
    }
}

module.exports = Array;