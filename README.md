# CLI Generator

## Introduction

Generates a cli api from a configuration file at run time, allowing you to write a cli program declaratively.

## Contents

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)

## Installation

```shell
yarn add cligen

# or

npm i cligen
```

## Usage

There are two steps to using this tool.

1. Using the `cligen` module
2. Writing a json or yaml file that defines your own API

### Using the bdd-cligen module

This is the main executable and should be placed in the `./bin` directory of your node project. The variable `program` is a [commander](https://www.npmjs.com/package/commander) object. It will make all functions in the `exec_path` callable with `your_app_name subcommand function_name --option_with_no_param --option_with_param icecream`

```javascript
#!/usr/bin/env node

const cligen = require('cligen')

const api = [
    {
        spec_path: './spec/api.yml',
        exec_path: './lib',
        subcommand: ''
    },
    {
        spec_path: './spec/sub1.yml',
        exec_path: './lib/subpath1',
        subcommand: 'subcommand1'
    },
    {
        spec_path: './spec/subcommand2.yml',
        exec_path: './lib/another_subpath2',
        subcommand: 'subcommand2'
    }
]

cligen(api).then(program => {
    program.parse(process.argv)
})
```

### Writing a yaml file

```yaml
testFunc:
    name: 'testFunc'
    description: 'Should load spec from file'
    func_name: 'testFunc'
    params_user:
        - name: message
          type: string
          default: 'Hello :)'
    params_internal:
        - name:
          type:
          default:
```
# emiln
