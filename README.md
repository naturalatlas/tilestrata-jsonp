# tilestrata-jsonp
[![NPM version](http://img.shields.io/npm/v/tilestrata-jsonp.svg?style=flat)](https://www.npmjs.org/package/tilestrata-jsonp)
[![Build Status](http://img.shields.io/travis/naturalatlas/tilestrata-jsonp/master.svg?style=flat)](https://travis-ci.org/naturalatlas/tilestrata-jsonp)
[![Coverage Status](http://img.shields.io/coveralls/naturalatlas/tilestrata-jsonp/master.svg?style=flat)](https://coveralls.io/r/naturalatlas/tilestrata-jsonp)

A [TileStrata](https://github.com/naturalatlas/tilestrata) plugin sending JSON as JSONP (wrapping it in a callback defined in the query string). This allows cross-origin use of utfgrids without setting up CORS.

```sh
$ npm install tilestrata-jsonp --save
```

### Sample Usage

```js
var jsonp = require('tilestrata-jsonp');

server.layer('mylayer').route('tile.json')
    .use(jsonp({variable: 'cb'}));
```

With this in place you can make requests like:

```
/mylayer/0/0/0/tile.json?cb=callback12389381
```

## Contributing

Before submitting pull requests, please update the [tests](test) and make sure they all pass.

```sh
$ npm test
```

## License

Copyright &copy; 2015 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/tilestrata-jsonp/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
