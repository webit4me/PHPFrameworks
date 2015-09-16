////// grunt/config/watch.js
////grunt.initConfig({
////    pkg: grunt.file.readJSON('package.json'),
////    uglify: {
////        options: {
////            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
////        },
////        build: {
////            src: 'src/<%= pkg.name %>.js',
////            dest: 'build/<%= pkg.name %>.min.js'
////        }
////    }
////});
//
//module.exports = function(grunt, config) {
//
//    grunt.config('vagrantssh', {
//
//                restart_apache: {
//                    path: '../vagrant/',
//                    commands: [
//                        'sudo service httpd stop',
//                        'sudo service httpd start'
//                    ],
//                    flags: ['-t', '-A'],
//                    callback: function (grunt, output) {
//                        grunt.log.writeln(output);
//                    },
//                }
//    });
//
//};


module.exports = {
            restart_apache: {
                path: '../vagrant/',
                commands: [
                    'sudo service httpd stop',
                    'sudo service httpd start'
                ],
                flags: [ '-t', '-A' ],
                callback: function( grunt, output ) {
                    grunt.log.writeln(output );
                }
            },
            asd: {
                path: '../vagrant/',
                commands: [
                    'ls -la'
                ],
                flags: [ '-t', '-A' ],
                callback: function( grunt, output ) {
                    grunt.log.writeln(output );
                }
            },
}