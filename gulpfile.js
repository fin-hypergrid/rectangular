'use strict';

var gulp = require('gulp'),
    manifest = require('./package.json'),
    make = require('fin-hypergrid-client-module-maker'),
    options = Object.assign({
        name: manifest.name,
        version: manifest.version,
        tasks: ['lint', 'test', 'build']
    }, manifest.wrapper);

make(gulp, options);
