// grunt/tasks/vagrantssh.js

module.exports = function (grunt) {

    grunt.registerTask('phpframeworks:init', 'Run all the required tasks required to initiate and start all the sample frameworks',
        [
            'vagrantssh:homepage_copy',
            'shell:laravel_init',
            'shell:cakephp_init',
        ]
    );

};
