module.exports = (operation) => {
    const parsedOperation = get(operation);
    return parsedOperation;
}

const get = (operation) => {
    switch (operation) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '\\times';
        default: return '\\div';
    }
}