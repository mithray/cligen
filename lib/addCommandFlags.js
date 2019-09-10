const changeCase = require('change-case')

async function addCommandFlags(options) {
    let command = options.command
    let commandData = options.commandData
    command.option(
        '--no-pretty',
        'Will print stringified objects instead of colorized yaml'
    )
    for (let param in commandData.param_descs) {
        let param_param = changeCase.paramCase(param.name)
        let flag = '--' + param_param + '[' + param_param + ']'
        let desc = param_name + ' default value is ' + param.default
        command.option(flag, desc, param.default)
    }
    return command
}

module.exports = addCommandFlags
