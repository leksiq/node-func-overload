'use strict';
(() => {


const
    path = require('path'),
    tap = require(path.resolve(process.env.APPDATA, 'npm/node_modules/tap')),
    {satisfy, M, C, X} = require('..')
;

class Class {

}

function Func() {

}

let {x} = {};
tap.equal(satisfy([x]), true);
tap.equal(satisfy([X(x)]), true);
tap.equal(satisfy([M(x)]), false);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), false);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), true);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), true);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), true);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), true);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), true);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = 1.2;
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), true);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), false);
tap.equal(satisfy([M(x, v => v === 1.2)]), true);
tap.equal(satisfy([C(x, v => v === 1.2)]), true);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = '1.2';
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), true);
tap.equal(satisfy([M(x, 'object')]), false);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), true);
tap.equal(satisfy([C(x, v => v === '1.2')]), true);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = {};
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), true);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = [];
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), true);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), true);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), true);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = () => {};
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), false);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), true);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), false);

x = new Class();
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), true);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), true);
tap.equal(satisfy([M(x, Func)]), false);

x = new Func();
tap.equal(satisfy([x]), false);
tap.equal(satisfy([X(x)]), false);
tap.equal(satisfy([M(x)]), true);
tap.equal(satisfy([C(x)]), true);
tap.equal(satisfy([M(x, 'number')]), false);
tap.equal(satisfy([M(x, 'string')]), false);
tap.equal(satisfy([M(x, 'object')]), true);
tap.equal(satisfy([M(x, v => v === 1.2)]), false);
tap.equal(satisfy([C(x, v => v === 1.2)]), false);
tap.equal(satisfy([M(x, v => v === 1)]), false);
tap.equal(satisfy([C(x, v => v === 1)]), false);
tap.equal(satisfy([M(x, v => v === '1.2')]), false);
tap.equal(satisfy([C(x, v => v === '1.2')]), false);
tap.equal(satisfy([M(x, v => v === '1')]), false);
tap.equal(satisfy([C(x, v => v === '1')]), false);
tap.equal(satisfy([M(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([C(x, v => Array.isArray(v))]), false);
tap.equal(satisfy([M(x, 'function')]), false);
tap.equal(satisfy([M(x, Class)]), false);
tap.equal(satisfy([M(x, Func)]), true);

})();
