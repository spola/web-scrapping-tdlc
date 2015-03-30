var fs = require("fs");
module.exports = {
    reset: function () {
        fs.writeFileSync("log.txt", "");
    },
    log: function (line) {
        fs.appendFileSync("log.txt", line + "\n");
    }
};