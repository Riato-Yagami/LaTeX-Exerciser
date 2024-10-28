const Fraction = require("../../../objects/Fraction");

const config = {
    exercicesCol : 3,
    correctionCol : 2,
    RELATIvs : false,
    priority : true,
    operandCountBounds : {min  : 3, max : 5},
    operandBounds : {min  : 1, max : 9}
}

const operations = ["+", "-"];
// const operations = ["+", "-", "*", "/"];

const args = {
    title : 'Entrainement - opérations sur les nombres relatifs',
    instructions : 'Effectuer les opérations suivantes',
    grade : '5e',
    calculator : false,
}

if(config.RELATIvs){
    args.title = '\\icon{logo}[0.75\\headheight]'
    args.other = '\\input{documents/enseignement/special/RELATIvs/header/header.tex}'
}

const get = () => {
    const exercise = createExercise();
    const exerciseStr = parseExercise(exercise);
    const correction = createCorrection(exercise);
    const correctionStr = parseCorrection(exerciseStr, correction);

    return {
        exercise: exerciseStr, 
        correction: correctionStr
    };
};


module.exports = {
    config,
    args,
    get
}

// Modified createExercise to allow 2 to 4 operands
const createExercise = () => {
    const operandCount = fun.randomInt(config.operandCountBounds.min,config.operandCountBounds.max);  // Generate between 2 and 4 operands
    const operands = Array.from({ length: operandCount }, () => randomOperand());
    const operation = Array.from({ length: operandCount - 1 }, () => operations.random());

    // Generate unique priority levels from 1 up to the number of operations
    const priority = Array.from({ length: operandCount - 1 }, (_, i) => i + 1);
    priority.shuffle()
    // console.log(priority);

    return { operands, operation, priority };
};

const parseExercise = (exercise) => {
    let str = `\$${parseOperandStr(exercise.operands[0], true)}`;

    for (let i = 1; i < exercise.operands.length; i++) {
        str += ` ${parseOperationStr(exercise.operation[i - 1])} ${parseOperandStr(exercise.operands[i])}`;
    }

    return `${str}\$`;
};

const createCorrection = (exercise) => {
    let operands = [...exercise.operands];
    let operations = [...exercise.operation];
    let priority = [...exercise.priority];
    let fractions = Array.from({ length: operands.length}, (_, i) => new Fraction(operands[i]));
    
    console.log(fractions)
    let denominator = 1;          // Initial denominator (assumed as 1)

    if(config.priority){
    // Step 1: Sort operations by priority (ascending order)
        const priorityIndices = priority
            .map((p, i) => ({ p, i }))
            .sort((a, b) => a.p - b.p)
            .map(obj => obj.i);

        let res = fractions[priorityIndices[0]];  // Initial numerator

        priorityIndices.forEach(i => {
            console.log(fractions[i+1])
            console.log(res.print() + operations[i] + fractions[i+1].print())
            switch (operations[i]) {
                case '+': res.add(fractions[i+1]) ;break;
                case '-': res.substract(fractions[i+1]) ;break;
                case '*': res.multiply(fractions[i+1]) ;break;
                default: res.divide(fractions[i+1]) ;break;
            }
            fractions.splice(i + 1, 1);  // Remove the next operand
            fractions.splice(i, 1);    // Remove the current operation
            console.log(res)
        })
    }

    // let numerator = operands[0];  // Initial numerator

    // // Step 1: Handle multiplication and division first
    // for (let i = 0; i < operations.length; i++) {
    //     if (operations[i] === '*') {
    //         operands[i] = parseOperation(operands[i], operands[i + 1], '*');  // Apply multiplication
    //         operands.splice(i + 1, 1);  // Remove the next operand
    //         operations.splice(i, 1);    // Remove the current operation
    //         i--;  // Adjust index to recheck the current position
    //     } else if (operations[i] === '/') {
    //         // operands[i] = parseOperation(operands[i], operands[i + 1], '/');  // Apply division
    //         denominator *= operands[i + 1];  // Update denominator
    //         operands.splice(i + 1, 1);  // Remove the next operand
    //         operations.splice(i, 1);    // Remove the current operation
    //         i--;  // Adjust index to recheck the current position
    //     }
    // }

    // // Step 2: Handle addition and subtraction
    // numerator = operands[0];  // Reset numerator with the first operand after handling * and /
    // for (let i = 0; i < operations.length; i++) {
    //     numerator = parseOperation(numerator, operands[i + 1] * denominator, operations[i]);
    // }

    // Return both numerator and denominator (even if denominator is 1 for non-division cases)
    return { result : {numerator, denominator} };
};


const parseCorrection = (exerciseStr, correction) => {
    const numerator = correction.result.numerator;
    const denominator = correction.result.denominator;

    const fraction = {numerator,denominator}
    let str = `${
        exerciseStr.slice(0, exerciseStr.length - 1)
    } = `
    
    if(denominator == 1){
        str += numerator
    }else{
        str += `${fun.parseFraction(fraction)}`
        const simplifiedFraction = fun.simplifyFraction(fraction)
        if(simplifiedFraction.numerator != numerator){
            str += ` = ${fun.parseFraction(simplifiedFraction)}`
        }

        str += ` ${fun.isDecimal(fraction)?
            `= ${numerator/denominator}` :
            `\\approx ${fun.roundValue(numerator/denominator,4)}`}`
    }

    str += '\$'

    return str;
};

const randomOperand = () => {
    return (fun.randomInt(config.operandBounds.min,config.operandBounds.max)) * (fun.randomBool() ? 1 : -1);
};

const parseOperandStr = (n, first = false) => {
    if(config.RELATIvs){
        let command = '\\'
        if (n < 0) { command += 'm'; }
        command += fun.numberName(Math.abs(n));
        return command
    }
    if (!first && n < 0) { return `(${n})`; }
    return `${n}`;
};

const parseOperationStr = (op) => {
    if(config.RELATIvs){
        switch (op) {
            case '+': return '\\plus';
            case '-': return '\\minus';
            case '*': return '\\time';
            default: return '\\obelus';
        }
    }
    return fun.parseOperation(op)
};

const parseOperation = (x, y, op) => {
    switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        default: return x / y;
    }
};
