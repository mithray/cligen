#!/usr/bin/env node

const cligen = require('../index.js')

const api = [
    {
        spec_path: './api.yml',
        exec_path: './lib',
        subcommand: ''
    }
]

cligen(api).then(program => {
    program.parse(process.argv)
})
