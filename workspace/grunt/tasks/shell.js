// grunt/tasks/shel.js

module.exports = function (grunt) {

    grunt.registerTask('vagrant:up', 'Booting up the virtual machine', 'shell:vagrant:up');
    grunt.registerTask('vagrant:halt', 'Booting up the virtual machine', 'shell:vagrant:halt');
    grunt.registerTask('vagrant:reload', 'Booting up the virtual machine', 'shell:vagrant:reload');
    grunt.registerTask('vagrant:provision', 'Booting up the virtual machine', 'shell:vagrant:provision');

    grunt.registerTask('cakephp:init', 'Initiate the cakePHP', 'shell:cakephp_init');

    grunt.registerTask('laravel:init', 'Initiate the cakePHP', 'shell:laravel_init');
};
