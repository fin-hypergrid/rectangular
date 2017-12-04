'use strict';

var gulp = require('gulp'),
    manifest = require('./package.json'),
    make = require('fin-hypergrid-client-module-maker');

var wrapper = {
    header: '(function(modules, exports) {',
    footer: '})(rectangular = { exports: {} }, rectangular.exports); rectangular = rectangular.exports;'
};

make(gulp, manifest, wrapper);
