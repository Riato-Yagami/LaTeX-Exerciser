const product = require("../../operator/product");

module.exports = _ => {
    return get();
}

const title = 'Écrire sous forme de fractions irréductibles :'

const header = `% VARIABLES %%%
\\setTitle{Interrogation - Entrainement - Séquence 1}
\\setgrade{4e}
%%`

const get = () => {
    const { numerator, denominator } = init();
    exercise = createExercise(numerator, denominator)
    correction = createCorrection(numerator, denominator)
    return {exercise : exercise, 
        correction : correction, 
        title : title, 
        header : header,
    };
};

// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
const primes = [2, 3, 5, 7, 11, 13]
const maxSize = 6

const init = () => {
    const numeratorSize = 2 + fun.randomInt(maxSize)
    const denominatorSize = 2 + fun.randomInt(maxSize)
    let numerator = []
    let denominator = []

    for(let i = 1; i <= numeratorSize; i++){
        numerator.push(primes.skewRandom(1.5))
    }

    numerator.sort(fun.greater)

    for(let i = 1; i <= denominatorSize; i++){
        denominator.push(primes.skewRandom(1.5))
    }
    
    denominator.sort(fun.greater)

    return { numerator, denominator };
};

const createExercise = (numerator, denominator) => {
    let content = ``
    content += `$\\frac{${product(numerator)}}{${product(denominator)}}$`
    return content;
};

const createCorrection = (numerator, denominator) => {
    let commonFactors = fun.commonElements(numerator, denominator)
    let numeratorContent = numerator.slice()
    let denominatorContent = denominator.slice()

    commonFactors.forEach(commonFactor => {
        numeratorContent.replace(commonFactor,`\\cancel{${commonFactor}}`)
        denominatorContent.replace(commonFactor,`\\cancel{${commonFactor}}`)
    });

    let numeratorKept = []
    let denominatorKept = []

    numeratorContent.forEach(factor => {
        if(typeof factor == "number"){numeratorKept.push(factor)}
    });

    denominatorContent.forEach(factor => {
        if(typeof factor == "number"){denominatorKept.push(factor)}
    });

    let content = ``
    content += `\\begin{align*}
    \\frac{${product(numerator)}}{${product(denominator)}} &=
    \\frac{${numeratorContent.join(' \\times ')}}
    {${denominatorContent.join(' \\times ')}}\\\\ &=
    \\frac{${numeratorKept.join(' \\times ') || 1}}
    {${denominatorKept.join(' \\times ') || 1}} =
    \\frac{${product(numeratorKept)}}{${product(denominatorKept)}}
    \\end{align*}`
    return content;
};