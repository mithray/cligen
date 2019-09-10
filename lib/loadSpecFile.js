const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

async function loadSpecFile(file_path) {
    let ext = path.extname(file_path)
    let file_data = fs.readFileSync(file_path, 'utf8')
    let spec
    if (ext === '.yml' || ext === '.yaml') {
        spec = await YAML.parse(file_data)
    } else if (ext === '.json') {
        spec = await JSON.parse(file_data)
    }

    return spec
}

module.exports = loadSpecFile
