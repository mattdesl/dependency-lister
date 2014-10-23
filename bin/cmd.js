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
        .help('h', 'show help message')
        .argv

var fs = require('fs')
var path = require('path')

var args
if (!argv.d && !argv.D && !argv.p && !argv.o)
    args = {}
else
    args = {
        dependencies: !!argv.d,
        optionalDependencies: !!argv.o,
        peerDependencies: !!argv.p,
        devDependencies: !!argv.D
    }



var input = argv._[0] || path.join(process.cwd(), 'package.json')
console.log(input)

fs.readFile(input, 'utf8', function(err, data) {
    
    var pkg = JSON.parse(data)
    list(pkg, args).then(display)
})
