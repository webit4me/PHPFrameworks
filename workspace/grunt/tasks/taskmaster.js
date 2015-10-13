// grunt/tasks/taskmaster.js

module.exports = function (grunt) {

    // Apache //////////////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.registerTask('apache:restart', 'Restart the apache server in the VM', 'vagrantssh:apache_restart');
    grunt.registerTask('apache:start', 'Start the apache server in the VM', 'vagrantssh:apache_start');
    grunt.registerTask('apache:stop', 'Stop the apache server in the VM', 'vagrantssh:apache_stop');

    // BlackFire ///////////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.registerTask('blackfire:disable', 'Disable BlackFire\'s PHP extetion', 'vagrantssh:blackfire_disable');
    grunt.registerTask('blackfire:enable', 'Enable BlackFire\'s PHP extetion, as well as deisabling the xdebug and xhprof', [
        'vagrantssh:xdebug_disable',
        'vagrantssh:xhprof_disable',
        'vagrantssh:blackfire_enable',
        'vagrantssh:apache_restart',
    ]);

    // Home-page ///////////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.registerTask('homepage:copy', 'Copy the default homepage for local.php.frameworks', 'vagrantssh:homepage_copy');

    // XDebug //////////////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.registerTask('xdebug:disable', 'Disable XDebug\'s PHP extetion', 'vagrantssh:xdebug_disable');
    grunt.registerTask('xdebug:enable', 'Enable XDebug\'s PHP extetion, as well as deisabling the BlackFire', [
        'vagrantssh:blackfire_disable',
        'vagrantssh:xdebug_enable',
        'vagrantssh:apache_restart',
    ]);

    // XHProf //////////////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.registerTask('xhprof:disable', 'Disable XHProf\'s PHP extetion', 'vagrantssh:xhprof_disable');
    grunt.registerTask('xhprof:enable', 'Enable XHProf\'s PHP extetion, as well as deisabling the BlackFire', [
        'vagrantssh:blackfire_disable',
        'vagrantssh:xhprof_enable',
        'vagrantssh:apache_restart',
    ]);



    //grunt.registerTask('composer:update:all', 'Runs "composer update" on all the components',
    //    [
    //        'composer:update:workspace',
    //        'composer:update:cakephp',
    //        'composer:update:kohana',
    //        'composer:update:laravel',
    //        'composer:update:symfony',
    //        'composer:update:zend',
    //    ]
    //);
    //grunt.registerTask('composer:update:workspace', 'Runs "composer update" in the workspace directory', 'vagrantssh:composer_update_workspace');
    //grunt.registerTask('composer:update:cakephp', 'Runs "composer update" in the cakephp directory', 'vagrantssh:composer_update_cakephp');
    //grunt.registerTask('composer:update:kohana', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_kahona');
    //grunt.registerTask('composer:update:laravel', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_laravel');
    //grunt.registerTask('composer:update:symfony', 'Runs "composer update" in the kahona directory', 'vagrantssh:composer_update_symfony');
    //grunt.registerTask('composer:update:zend', 'Runs "composer update" in the zend directory', 'vagrantssh:composer_update_zend');
    //
    //grunt.registerTask('phalcon:install', 'Compile and installing phalconPHP extension', 'vagrantssh:phalcon_install');

};
