// grunt/tasks/default.js

module.exports = function (grunt) {

    grunt.registerTask('apache:restart', 'Restart the apache server in the VM', 'vagrantssh:apache_restart');

    grunt.registerTask('homepage:copy', 'Copy the default homepage for local.php.frameworks', 'vagrantssh:homepage_copy');

    grunt.registerTask('composer:update:all', 'Runs "composer update" on all the components',
        [
            'composer:update:workspace',
            'composer:update:cakephp',
            'composer:update:kohana',
            'composer:update:laravel',
            'composer:update:symfony',
            'composer:update:zend',
        ]
    );
    grunt.registerTask('composer:update:workspace', 'Runs "composer update" in the workspace directory', 'vagrantssh:composer_update_workspace');
    grunt.registerTask('composer:update:cakephp', 'Runs "composer update" in the cakephp directory', 'vagrantssh:composer_update_cakephp');
    grunt.registerTask('composer:update:kohana', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_kahona');
    grunt.registerTask('composer:update:laravel', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_laravel');
    grunt.registerTask('composer:update:symfony', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_symfony');
    grunt.registerTask('composer:update:zend', 'Runs "composer update" in the zend directory', 'vagrantssh:composer_update_zend');

};