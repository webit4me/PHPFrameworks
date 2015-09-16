// Gruntfile.js

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env
    };

    grunt.util._.extend(config, loadConfig('./grunt/config/'));

    grunt.initConfig(config);

    grunt.loadTasks('grunt/tasks');

};

function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
}