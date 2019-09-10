const changeCase = require('change-case')

async function handleAction(command, commands) {
    name = changeCase.camelCase(command._name)
    data = commands[name]
    let WD = process.env.PWD
    let func_name = data.func_name
    let func_path = WD + '/' + data.path_prefix + '/' + func_name + '.js'
    const func = require(func_path)
    let params = data.params_internal
    let params_user = data.params_user
    let args = {}
    params.forEach(param => {
        let val = param.default
        if (params_user) {
            try {
                params_user.forEach(param_user => {
                    val = val.replace(
                        '${' + param_user.name + '}',
                        command[changeCase.camelCase(param_user.name)]
                    )
                    console.log(val)
                })
            } catch (e) {}
        }
        args[param.name] = val
    })
    params_user.forEach(param_user => {
        args[param_user.name] = command[param_user.name]
    })
    let res = await func(args)
    console.log(res)
    //    console.log(res.stdout.trim())
    //   console.log(res.stderr.trim())
}

module.exports = handleAction
