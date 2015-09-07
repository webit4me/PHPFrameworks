var gulp = require('gulp');
var shell = require('gulp-shell');
var taskListing = require('gulp-task-listing');
//var taskListing = require('gulp-cli');

gulp.task('default', taskListing);

gulp.task('restart', function () {
    return gulp.src('*.js', {read: false})
        .pipe(shell([
            'echo <%= f(file.path) %>',
            'ls -l <%= file.path %>'
        ], {
            templateData: {
                f: function (s) {
                    return s.replace(/$/, '.bak')
                }
            }
        }))
});

// Composer
gulp.task('composer:update:all', [
    'workspace:composer:update',
    'cakephp:composer:update',
    'kohana:composer:update',
    'laravel:composer:update',
    'symfony:composer:update',
    'zend:composer:update'
]);

gulp.task('workspace:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('cakephp:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace/cakephp && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('kohana:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace/kohana && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('laravel:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace/laravel && composer update;"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('symfony:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace/symfony && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('zend:composer:update', shell.task([
        'vagrant ssh -c "cd /workspace/zend && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

// Apache
gulp.task('httpd:restart', ['httpd:stop', 'httpd:start']);

gulp.task('httpd:start', shell.task([
        'vagrant ssh -c "sudo service httpd start"',
    ], {
        "cwd": "../vagrant"
    }
));


gulp.task('httpd:stop', shell.task([
        'vagrant ssh -c "sudo service httpd stop"',
    ], {
        "cwd": "../vagrant"
    }
));


// Blackfire
gulp.task('blackfire:install', shell.task([
        'vagrant ssh -c "sudo yum -y install pygpgme"',
        'vagrant ssh -c "wget -O - "http://packages.blackfire.io/fedora/blackfire.repo" | sudo tee /etc/yum.repos.d/blackfire.repo"',
        'vagrant ssh -c "sudo yum install blackfire-agent -y"',
        'vagrant ssh -c "sudo blackfire-agent -register"',
        'vagrant ssh -c "sudo service httpd restart"',
        'vagrant ssh -c "sudo /etc/init.d/blackfire-agent restart"',
        'vagrant ssh -c "sudo yum -y install blackfire-agent"',
        'vagrant ssh -c "blackfire config"',
        'vagrant ssh -c "sudo yum -y install blackfire-php"',
        'echo "End of the installation"',
        'vagrant reload"'
    ], {
        "cwd": "../vagrant"
    }
));


// Dev-tools
gulp.task('dev-tools:install', ['dev-tools:install:laravel', 'dev-tools:install:symfony']);

gulp.task('dev-tools:install:laravel', shell.task([
        'vagrant ssh -c "composer global require "laravel/installer=~1.1""',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('dev-tools:install:symfony', shell.task([
        'vagrant ssh -c "sudo curl -LsS http://symfony.com/installer -o /home/vagrant/.composer/vendor/bin/symfony"',
        'vagrant ssh -c "sudo chmod a+x /home/vagrant/.composer/vendor/bin/symfony"',
    ], {
        "cwd": "../vagrant"
    }
));


// cakePHP
gulp.task('cakephp:init', shell.task([
        'if [ ! -f config/app.php ]; then cp -n config/app.default.php config/app.php; fi',
        'sed -i -e \'s/__SALT__/__SALT__PHP_FRAMEWORKS/g\' config/app.php;',
        'sed -i -e "s/\'database\' => \'my_app\'/\'database\' => \'dbcakephp\'/g" config/app.php;',
        'sed -i -e "s/\'username\' => \'my_app\'/\'username\' => \'dbuser\'/g" config/app.php;',
        'sed -i -e "s/\'password\' => \'secret\'/\'password\' => \'123\'/g" config/app.php;',
        //'sudo chmod a+w tmp',
        //'sudo chmod a+w log',
    ], {
        "cwd": "cakephp"
    }
));

// laravel
gulp.task('laravel:init', shell.task([
        'if [ ! -f .env ]; then cp -n .env.example .env && composer update --no-scripts; fi',
        'php artisan key:generate'
    ], {
        "cwd": "laravel"
    }
));

