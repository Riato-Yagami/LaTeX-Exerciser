module.exports = (name, content, title = '') => {
    let text = `\\${name}{${title}}{\%\n${content}}`
    return text;
}