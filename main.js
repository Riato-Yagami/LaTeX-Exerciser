const config = require("./config/config");

global.__basedir = __dirname;
global.config = require(__basedir + '/config/config')
global.fun = require(__basedir + '/loaders/load-functions')

require(__basedir + '/loaders/prototype.js')


// exerciseGenerator = fun.proportionality;
exerciseGenerator = fun.fractionSimplification;

// Fonction pour générer plusieurs exercices et corrections en LaTeX
const generateMultipleExercises = (numExercises) => {
    let exoContent = `\\multiColEnumerate{${config.exercicesCol}}{\n`;

    let corrContent = `\\multiColEnumerate{${config.correctionCol}}{\n`;

    let exoTitle = ''
    let exoHeader = ''
    // Génération des exercices
    for (let i = 1; i <= numExercises; i++) {
        const exercice = exerciseGenerator();
        exoContent += `\\item${exercice.exercise}\n\n`;
        corrContent += `\\item${exercice.correction}\n\n`;
        exoTitle = exercice.title || ''
        exoHeader = exercice.header || ''
    }

    corrContent += `}` // end multiColEnumerate
    exoContent += `}` // end multiColEnumerate
    const exo = fun.section('exo',exoContent,exoTitle)
    const corr = fun.section('corr',corrContent)
    const texContent = exoHeader + '\n\n' + exo + '\n\n\\newpage\n\n' + corr;

    // Ajout de la correction après les exercices
    // texContent += correctionContent;

    fun.writeFile("output.tex",texContent);
};

// Nombre d'exercices à générer (vous pouvez ajuster ce nombre selon vos besoins)
const numExercises = process.argv[2] || 1; // Par défaut, 5 exercices, ou vous pouvez spécifier via la ligne de commande
generateMultipleExercises(numExercises);
