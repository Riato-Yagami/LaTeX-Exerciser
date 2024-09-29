module.exports = _ => {
    return get();
}

const title = 'Les tableaux ci-dessous représentent-ils une situation de proportionnalité ?'

const header = `% VARIABLES %%%
\\setTitle{Interrogation - Entrainement - Séquence 2}
\\setgrade{5e}
%%

\\calculator`

const get = () => {
    const { table1, table2, isNearlyProportional, numColumns } = createExercise();

    const exercise = `\\begin{tabular}{|${'C{1.5cm}|'.repeat(numColumns)}}
    \\hline
    ${table1.join(' & ')}\\\\
    \\hline
    ${table2.join(' & ')}\\\\
    \\hline
\\end{tabular}`;

    const correction = `${createCorrection(table1, table2, isNearlyProportional)}`;

    return { exercise, correction, title, header};
};

const createExercise = () => {
    // Nombre de colonnes aléatoires entre 2 et 4
    const numColumns = Math.floor(Math.random() * 3) + 2;

    // Génère les premières valeurs du tableau de base
    const table2 = Array.from({ length: numColumns }, () => fun.randomValue(0, 100));

    // Génère un ratio fixe pour la proportionnalité
    const ratio = fun.randomValue(0.1,5); // Ratio entre 1 et 5

    // On décide aléatoirement si c'est un cas proportionnel ou presque proportionnel
    const isNearlyProportional = Math.random() < 0.5;

    let table1;

    table1 = fun.proportionalTable(table2, ratio, isNearlyProportional)

    return { table1, table2, isNearlyProportional, numColumns };
};

const createCorrection = (table1, table2, isNearlyProportional) => {
    let result = '\\begin{align*}\n';
    const ratios = table1.map((val, idx) => (fun.roundValue(val / table2[idx])));

    for (let i = 0; i < table1.length; i++) {
        result += `\\frac{${table1[i]}}{${table2[i]}} = ${ratios[i]}\\qquad `;
    }

    result += '\n\\end{align*}\n';

    if (isNearlyProportional) {
        result += "L'\\key{inégalité} des quotients indique qu'\\key{il ne sagit pas} d'une situation de proportionnalité.";
    } else {
        result += "L'\\key{égalité} des quotients indique qu'\\key{il s'agit bien} d'une situation de proportionnalité.";
    }

    return result;
};