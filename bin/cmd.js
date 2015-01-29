#!/usr/bin/env node

var list = require('../')
var display = require('./display')
// var pkg = require('../package.json')
require('bluebird').longStackTraces()
var argv = require('yargs')
        .alias('h', 'help')
        .alias('d', 'dependencies')
        .alias('D', 'devDependencies')
        .alias('o', 'optionalDependencies')
        .alias('p', 'peerDependencies')
        .alias('t', 'truncate')
        .alias('c', 'compact')
        .describe('d', 'show dependencies')
        .describe('D', 'show devDependencies')
        .describe('p', 'show peerDependencies')
        .describe('o', 'show optionalDependencies')
        .describe('t', 'truncate description to N chars')
        .describe('c', 'compact output, no description')
        .usage('Usage:\ndependency-lister [path/to/package.json]')
        .help('h', 'show help message')
        .argv

var fs = require('fs')
var path = require('path')

if (argv.t === 'false')
    argv.t = false

var args
if (!argv.d && !argv.D && !argv.p && !argv.o)
    args = { truncate: argv.t, compact: argv.c }
else
    args = {
        dependencies: !!argv.d,
        optionalDependencies: !!argv.o,
        peerDependencies: !!argv.p,
        devDependencies: !!argv.D,
        truncate: argv.t,
        compact: argv.c
    }

var input = argv._[0] || path.join(process.cwd(), 'package.json')
if (!fs.existsSync(input))
    throw new Error("can't find package.json at: "+input)
if (!fs.statSync(input).isFile())
    throw new Error("not a package.json file: "+input)

fs.readFile(input, 'utf8', function(err, data) {
    var pkg = JSON.parse(data)
    list(pkg, args).then(function(p) {
        return display(p, args)
    })
})
