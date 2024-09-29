module.exports = (table, ratio, nearly = false) => {
    return get(table, ratio, nearly);
}

const get = (table, ratio, nearly) => {
    return table.map(val =>
        fun.proportionalValue(val, ratio, nearly)
    );
};