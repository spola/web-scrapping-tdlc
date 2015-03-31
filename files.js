/*global require*/

var fs = require("fs"),
    log = require("./log.js").log,
    constantes = require("./constantes"),
    RUTA = constantes.ruta + constantes.output;

(function (module, require) {
    "use strict";


    var fileSize = function (filename, numero) {
        filename = filename.replace("DocumentosMultiples", numero);
        filename = RUTA + filename.substr(1);
        var stats = fs.statSync(filename),
            fileSizeInBytes = stats.size;
        return fileSizeInBytes;
    };

    var normalizePath = function (s, folder) {
        return s.replace("DocumentosMultiples", folder);
    };

    var checkFile = function (filename) {
        if (!fs.existsSync(filename)) {
            return false;
        }
        var stats = fs.statSync(filename),
            fileSizeInBytes = stats.size;
        return fileSizeInBytes > 2000;
    };

    var extract = function (files, numero, mustNormalize) {
        return files
            .filter(function (s) {
                if (fileSize(s, numero) < 2000) {
                    log(numero + "\t" + "404" + "\t" + s);
                    return false;
                } else {
                    return true;
                }
            })
            .map(function (s) {
                if (mustNormalize === false) {
                    return s;
                } else {
                    return normalizePath(s, numero);
                }
            });
    };

    module.exports = {
        fileSize: fileSize,
        checkFile: checkFile,
        normalizePath: normalizePath,
        extract: extract
    };
}(module, require));