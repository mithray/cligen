const fs = require('fs')
const path = require('path')
const program = require('commander')
const changeCase = require('change-case')
const readPkgUp = require('read-pkg-up')

const loadSpecFile = require('./lib/loadSpecFile.js')
const loadFunction = require('./lib/loadFunction.js')
const parseCommandData = require('./lib/parseCommandData.js')
const print = require('./lib/print.js')
const arrangeImplicitParameters = require('./lib/arrangeImplicitParameters.js')
const addCommandFlags = require('./lib/addCommandFlags.js')
const handleAction = require('./lib/handleAction.js')

const generic_opts = require('./lib/genericOptions.js')

async function getCommanderCommand(args) {
    let name = changeCase.paramCase(args.command.name)
    let index = await args.program.commands.findIndex(function(o) {
        return o._name === name
    })
    return args.program.commands[index]
}

const commands = {}

async function loadCommands(apis_array) {
    let api = apis_array[0]
    api.spec = await loadSpecFile(api.spec_path)
    for (let command of Object.values(api.spec)) {
        command.path_prefix = api.exec_path
        commands[command.name] = command
        program
            .command(changeCase.paramCase(command.name))
            .description(command.description)
            .option(...Object.values(generic_opts.pretty))
            .action(command_name => {
                //                console.log(commands)

                handleAction(command_name, commands)
            })

        if (command.params_user) {
            for (let userParam of command.params_user) {
                let paramName = changeCase.paramCase(userParam.name)
                let flag = '--' + paramName + ' <' + paramName + '>'
                let desc =
                    userParam.name + ' default value is ' + userParam.default
                commanderCommand = await getCommanderCommand({
                    command,
                    program
                })
                commanderCommand.option(flag, desc, userParam.default)
            }
        }
    }

    const config = await readPkgUp()

    program.name(config.package.name)
    program.version(config.package.version)

    return program
}

module.exports = loadCommands
