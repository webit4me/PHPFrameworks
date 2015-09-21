// grunt/config/shell.js

module.exports = {
    vagrant: {
        command: function (cmd) {
            return 'cd ../vagrant && vagrant ' + cmd;
        },
    },

    cakephp_init: {
        command: [
            'cp config/app.default.php config/app.php',
            'sed -i -e "s/__SALT__/PHP_FRAMEWORKS/g" config/app.php',
            'sed -i -e "s/\'database\' => \'my_app\'/\'database\' => \'dbcakephp\'/g" config/app.php',
            'sed -i -e "s/\'username\' => \'my_app\'/\'username\' => \'dbuser\'/g" config/app.php',
            'sed -i -e "s/\'password\' => \'secret\'/\'password\' => \'123\'/g" config/app.php',
        ].join('&&'),
        options: {
            execOptions: {
                cwd: 'cakephp',
            }
        }
    },

    laravel_init: {
        command: [
            'if [ ! -f .env ]; then cp -n .env.example .env && composer update --no-scripts; fi',
            'php artisan key:generate'
        ].join('&&'),
        options: {
            execOptions: {
                cwd: 'laravel',
            }
        }
    }
}
