// grunt/tasks/default.js

module.exports = function(grunt) {
    //grunt.registerTask('default', 'Say hello!', function() {
    //    grunt.log.writeln("Hello world!");
    //});

    //grunt.registerTask('httpd:restart', ['vagrantssh:restart_apache']);
    grunt.registerTask('httpd:restart', 'Restart the apache server in the VM', 'vagrantssh:restart_apache');
    //grunt.registerTask('httpd:restart', 'Restart the apache server in the VM', 'vagrantssh');
};