var semver = require('semver')
var template = require('minstache')
var txt = require('fs').readFileSync(__dirname+'/basic.md', 'utf8')
var err = require('fs').readFileSync(__dirname+'/error.md', 'utf8')

function print(d) {
    if (!d.info) {
        console.log('  '+template(err, d))
        return
    }

    d.version = d.version.replace(/^[\~\^]/g, '')
    d.url = d.info[0].homepage && d.info[0].homepage
    if (!d.url)
        d.url = '[missing url]'
    d.description = d.info[0].description || '[missing description]'
    if (d.description.length > 60)
        d.description = d.description.substring(0, 80)+'...'
    d.license = d.info[0].license || '[missing license]'

    console.log('  '+template(txt, d))
}

function display(packages) {
    Object.keys(packages).forEach(function(k) {
        var dash = Array(k.length+1).join('-')
        console.log(k, '('+k.length+')\n' + dash)
        packages[k].forEach(print)
    })
    
}
module.exports = display