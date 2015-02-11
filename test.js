var list = require('./')
var display = require('./bin/display')
var pkg = require('./package.json')

var defaultArgs = {
    dependencies: false,
    optionalDependencies: false,
    peerDependencies: false,
    devDependencies: true
}
list(pkg, defaultArgs).then(display)