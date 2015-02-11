var registry = require('npm-stats')()
var Promise = require('bluebird')

var stats = Promise.promisify(function(name, callback) {
    registry.module(name).info(callback)
})

function list(pkg, type, opt) {
    var dep = (pkg[type] || [])
    var result = Object.keys(dep).map(function(k) {
        return {
            name: k,
            version: dep[k]
        }
    })

    return Promise.map(result, function(p) {
        return stats(p.name)
            .then(function(info) {
                p.info = info
                return p
            })
            .catch(function(err) {
                return p
            })
    }, opt)
}

module.exports = function(pkg, opt) {
    opt = opt||{}

    var deps = [
        'dependencies', 
        'devDependencies', 
        'optionalDependencies', 
        'peerDependencies'
    ]

    var ret = {}

    deps = deps.filter(function(d) {
        return opt[d] !== false && pkg[d]
    })
    return Promise.map(deps, function(d) {
        return list(pkg, d, opt).then(function(r) {
            ret[d] = r
        })
    }).then(function() {
        return ret
    })
}