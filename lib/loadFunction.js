async function loadFunction(commandData) {
    let func_path = commandData.func_path
    try {
        func = require(func_path)
    } catch (err) {
        console.log(err)
        console.log('failed to load function: ' + func_path)
        return
    }

    return func
}

module.exports = loadFunction
