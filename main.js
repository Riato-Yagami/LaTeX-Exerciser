const config = require("./config/config");

global.__basedir = __dirname;
global.config = require(__basedir + '/config/config')
global.fun = require(__basedir + '/loaders/load-functions')

require(__basedir + '/loaders/load-objects.js')

const exerciseGenerator = fun[config.exercise];

// Fonction pour générer plusieurs exercices et corrections en LaTeX
const generateMultipleExercises = (numExercises) => {
    const args = exerciseGenerator.args;
    const exerciceConfig = exerciseGenerator.config;

    if (exerciceConfig !== undefined) {
        for (let key in exerciceConfig) {
            if (exerciceConfig.hasOwnProperty(key)) {
                config[key] = exerciceConfig[key];  // Replace config property if it exists in exerciceConfig
            }
        }
    }
    
    const instructions = args.instructions;
    const header = fun.parseHeader(args);

    let exoContent = `\\multiColEnumerate{${config.exercicesCol}}{\n`;

    let corrContent = `\\multiColEnumerate{${config.correctionCol}}{\n`;

    // Génération des exercices
    for (let i = 1; i <= numExercises; i++) {
        const exercise = exerciseGenerator.get();
        exoContent += `\\item${exercise.exercise}\n\n`;
        corrContent += `\\item${exercise.correction}\n\n`;
    }

    corrContent += `}` // end multiColEnumerate
    exoContent += `}` // end multiColEnumerate
    const exo = fun.section('exo',exoContent,instructions)
    const corr = fun.section('corr',corrContent)
    const texContent = header + '\n\n' + exo + '\n\n\\newpage\n\n' + corr;

    // Ajout de la correction après les exercices
    // texContent += correctionContent;

    fun.writeFile("output.tex",texContent);
};

// Nombre d'exercices à générer (vous pouvez ajuster ce nombre selon vos besoins)
const numExercises = process.argv[2] || 1; // Par défaut, 5 exercices, ou vous pouvez spécifier via la ligne de commande
generateMultipleExercises(numExercises);
// console.log([1,2].random())