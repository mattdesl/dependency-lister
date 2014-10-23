var semver = require('semver')
var template = require('minstache')
var txt = require('fs').readFileSync(__dirname+'/basic.md', 'utf8')
var err = require('fs').readFileSync(__dirname+'/error.md', 'utf8')
var number = require('as-number')

function print(opt, d) {
    if (!d.info) {
        console.log('  '+template(err, d))
        return
    }

    d.version = d.version.replace(/^[\~\^]/g, '')
    d.url = d.info[0].homepage && d.info[0].homepage
    if (!d.url)
        d.url = '[missing url]'
    d.description = d.info[0].description || '[missing description]'
    if (opt.truncate !== false && (d.description.length > number(opt.truncate, 60)))
        d.description = d.description.substring(0, 80)+'...'
    d.license = d.info[0].license || '[missing license]'

    console.log('  '+template(txt, d))
}

function display(packages, opt) {
    opt = opt||{}
    Object.keys(packages).forEach(function(k, i, self) {
        var dash = Array(k.length+1).join('-')
        console.log(k, '('+packages[k].length+')\n' + dash)
        packages[k].forEach(print.bind(null, opt))
        if (i!==self.length-1) console.log()
    })
    
}
module.exports = display