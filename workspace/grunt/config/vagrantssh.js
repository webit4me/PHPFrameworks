// grunt/config/vagrantssh.js

var $vagrantFolder = '../vagrant/';
var $workspace = '/workspace';

module.exports = {
    options: {
        path: $vagrantFolder,
        flags: ['-t', '-A'],
        callback: function (grunt, output) {
            grunt.log.writeln(output);
        }
    },
    // APACHE : ////////////////////////////////////////////////////////////////////////////////////////////////////////
    apache_restart: {
        commands: [
            'sudo service httpd stop',
            'sudo service httpd start',
        ],
    },
    apache_start: {
        commands: [
            'sudo service httpd start'
        ],
    },
    apache_stop: {
        commands: [
            'sudo service httpd stop'
        ],
    },


    // Black Fire //////////////////////////////////////////////////////////////////////////////////////////////////////
    blackfire_disable: {
        commands: [
            "sudo sed -i -e 's/^extension=blackfire.so/\;extension=blackfire.so/g' /etc/php.d/zz-blackfire.ini"
        ]
    },
    blackfire_enable: {
        commands: [
            "sudo sed -i -e 's/^;extension=blackfire.so/extension=blackfire.so/g' /etc/php.d/zz-blackfire.ini"
        ]
    },



    // Home-page ///////////////////////////////////////////////////////////////////////////////////////////////////////
    homepage_copy: {
        commands: [
            'sudo cp -f /workspace/phpframeworks/public/index.html /var/www/html/',
        ],
    },


    // XDebug //////////////////////////////////////////////////////////////////////////////////////////////////////////
    xdebug_disable: {
        commands: [
            "sudo sed -i -e 's/^zend\_extension\=/\;zend\_extension=/g' /etc/php.d/zzzz_custom.ini"
        ]
    },
    xdebug_enable: {
        commands: [
            "sudo sed -i -e 's/^;zend\_extension\=/zend\_extension=/g' /etc/php.d/zzzz_custom.ini"
        ]
    },


    // XHProf //////////////////////////////////////////////////////////////////////////////////////////////////////////
    xhprof_disable: {
        commands: [
            "sudo sed -i -e 's/^extension=xhprof.so/\;extension=xhprof.so/g' /etc/php.d/20-xhprof-custom.ini"
        ]
    },
    xhprof_enable: {
        commands: [
            "sudo sed -i -e 's/^;extension=xhprof.so/extension=xhprof.so/g' /etc/php.d/20-xhprof-custom.ini"
        ]
    },


}