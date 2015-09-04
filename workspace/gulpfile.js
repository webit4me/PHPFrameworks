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
gulp.task('composer:update', [
    'composer:update:cakephp',
    'composer:update:kohana',
    'composer:update:laravel',
    'composer:update:symfony',
    'composer:update:zend'
]);

gulp.task('composer:update:cakephp', shell.task([
        'vagrant ssh -c "cd /workspace/cakephp && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('composer:update:kohana', shell.task([
        'vagrant ssh -c "cd /workspace/kohana && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('composer:update:laravel', shell.task([
        'vagrant ssh -c "cd /workspace/laravel; && composer update;"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('composer:update:symfony', shell.task([
        'vagrant ssh -c "cd /workspace/symfony && composer update"',
    ], {
        "cwd": "../vagrant"
    }
));

gulp.task('composer:update:zend', shell.task([
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

gulp.task('shorthand', shell.task([
    'echo hello',
    'echo world'
]));