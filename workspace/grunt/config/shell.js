// grunt/config/shell.js

module.exports = {
    vagrant: {
        command: function (cmd) {
            return 'cd ../vagrant && vagrant ' + cmd;
        },
    },
}
