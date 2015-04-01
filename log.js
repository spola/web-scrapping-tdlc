/*jslint node: true*/
var fs = require("fs");
module.exports = {
    reset: function () {
        'use strict';
        fs.writeFileSync("log.txt", "");
    },
    log: function (line) {
        'use strict';
        fs.appendFile("log.txt", line + "\n");
    }
};