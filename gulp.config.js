'use strict';

var util = require('gulp-util');

module.exports = {
    dev_path: './src/',
    dist_path: './dist/',
    module: {
        name: 'pentaho-angular-toolkit',
        dist_path: 'module_dist',
        files: [
            'README.md',
            'LICENSE',
            'dist/**/*',
            'module_tmp/**/.*',
            'module_tmp/**/*'
        ]
    },
    log:log
};

/**
* Log a message or series of messages using chalk's blue color.
* Can pass in a string, object or array.
*/
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}
