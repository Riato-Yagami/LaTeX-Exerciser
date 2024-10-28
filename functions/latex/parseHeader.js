module.exports = (args) => {
    let header = `%%% VARIABLES \n`
    
    if(args.title){header += `\\setTitle{${args.title}} \n`}

    if(args.grade){header += `\\setGrade{${args.grade}} \n`}

    if(args.calculator != null){header += `${
        args.calculator? '\\calculator' : '\\noCalculator'
    } \n`}

    if(args.other){header += args.other + '\n'}


    header += `%%%`

    return header
}