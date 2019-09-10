const yaml = require('yaml')
const fs = require('fs')

async function loadSpecFile(path) {
    let yaml_file_data = fs.readFileSync(path, 'utf8')
    let spec = await yaml.parse(yaml_file_data)

    return spec
}

module.exports = loadSpecFile
