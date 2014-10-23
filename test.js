var list = require('./')
var display = require('./bin/display')
var pkg = require('./package.json')

var defaultArgs = {
    dependencies: true,
    optionalDependencies: false,
    peerDependencies: false,
    devDependencies: false
}
list(pkg, defaultArgs).then(display)