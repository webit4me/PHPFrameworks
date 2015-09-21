// grunt/config/vagrantssh.js

var $vagrantFolder = '../vagrant/';
var $workspace = '/workspace';

module.exports = {
    apache_restart: {
        path: $vagrantFolder,
        commands: [
            'sudo service httpd stop',
            'sudo service httpd start'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    homepage_copy: {
        path: $vagrantFolder,
        commands: [
            'sudo cp -f /workspace/phpframeworks/public/index.html /var/www/html/',
        ],
    },
    // Composer
    composer_update_workspace: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace,
            'composer update'
        ],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    composer_update_cakephp: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace + '/cakephp',
            'composer update'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    composer_update_kahona: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace + '/kahona',
            'composer update'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    composer_update_laravel: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace + '/laravel',
            'composer update'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    composer_update_symfony: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace + '/symfony',
            'composer update'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    composer_update_zend: {
        path: $vagrantFolder,
        commands: [
            'cd ' + $workspace + '/zend',
            'composer update'
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    phalcon_install: {
        path: $vagrantFolder,
        commands: [
            '/vagrant/puphpet/files/exec-once/install_phalconphp.sh',
        ],
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    }
}