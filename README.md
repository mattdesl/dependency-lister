# dependency-lister

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Lists your module's dependencies with URLs and licenses.

```
dependency-lister

### prints the following to stdout

dependencies (6)
------------
  as-number (1.0.0) MIT
     https://github.com/mattdesl/as-number
     typeof number, or use a default
  bluebird (2.3.6) MIT
     https://github.com/petkaantonov/bluebird
     Full featured Promises/A+ implementation with exceptionally good performance
  minstache (1.2.0) [missing license]
     [missing url]
     Mini mustache template engine
  npm-stats (1.0.0) MIT
     https://github.com/hughsk/npm-stats
     Convenience module for getting back data from an NPM registry
  semver (4.1.0) BSD
     https://github.com/isaacs/node-semver
     The semantic version parser used by npm.
  yargs (1.3.2) MIT/X11
     https://github.com/chevex/yargs
     Light-weight option parsing with an argv hash. No optstrings attached.
```

## Usage

[![NPM](https://nodei.co/npm/dependency-lister.png)](https://nodei.co/npm/dependency-lister/)

```npm install -g dependency-lister```

```sh
Usage:
dependency-lister [path/to/package.json]

Options:
  -d, --dependencies          show dependencies              
  -D, --devDependencies       show devDependencies           
  -p, --peerDependencies      show peerDependencies          
  -o, --optionalDependencies  show optionalDependencies      
  -t, --truncate              truncate description to N chars
  -h, --help                  show help message       
```

Defaults to the current directory's `package.json`. If no arguments are given, all dependencies are listed. Otherwise, it only lists the specified dependendency types.

Truncate defaults to 60 chars; if you do `-t=false` it will not truncate at all. 

## API

#### `list(packageObj[, opt])`

Returns a promise that resolves to a hash of dependencies for the given package object. By default, lists all dependency types.

e.g. 
```js
var pkg = require('fs').readFileSync(__dirname+'/package.json', 'utf8')
pkg = JSON.parse(pkg)

list(pkg, { dependencies: true, devDependencies: false }).then(function(result) {
    reuslt.dependencies.forEach(function(d) {
        console.log(d.name, d.version)
        console.log(d.info) //the stats returned from npm registry
    })
})
```


## License

MIT, see [LICENSE.md](http://github.com/mattdesl/dependency-lister/blob/master/LICENSE.md) for details.
