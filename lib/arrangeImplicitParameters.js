async function arrangeImplicitParameters(command) {
    let params = {}

    command.param_descs_impl = command.param_descs_impl.filter(
        desc => desc.default.length > 1
    )

    for (let i in command.param_descs_impl) {
        let param = command.param_descs_impl[i]
        let key = param.name.replace(/.*\.(.*)/, '$1')
        let value = param.default
        params[key] = value
    }

    //    console.log(params)
    return params
}

module.exports = arrangeImplicitParameters
