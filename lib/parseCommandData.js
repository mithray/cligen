const changeCase = require('change-case')
const parseParamDescriptions = require('./parseParamDescriptions.js')

function parseCommandData(spec, idx) {
    let command = spec.api[idx]
    let WD = process.env.PWD
    let func_path =
        WD + '/' + spec.path_prefix + '/' + command.func_name + '.js'
    let name = changeCase.paramCase(command.name)
    let description = command.description.toLowerCase()

    let param_descs_impl = parseParamDescriptions(command.param_impl)
    let param_descs_expl = parseParamDescriptions(command.param_expl)

    if (description.startsWith('should')) {
        description = description.substring(7)
    }
    description = changeCase.sentenceCase(description)
    return { param_descs_impl, param_descs_expl, name, description, func_path }
}

module.exports = parseCommandData
