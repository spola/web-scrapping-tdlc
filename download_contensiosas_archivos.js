/*global require, module, console*/
var request = require('request'),
    path = require("path"),
    url_base = "http://www.tdlc.cl",
    fs = require('fs'),
    files = require("./files.js"),
    querystring = require('querystring');

var field_files = [
    'demanda',
    'contestaciones',
    'informes',
    'auto_prueba',
    'obs_prueba',
    'vista',
    'presentaciones',
    'escritos',
    'resoluciones',
    'documentos_relevantes'
];

var download = function (id, causa, destino, done) {
    'use strict';

    var files_requested = 0,
        total;


    total = field_files
        .map(function (s) {
            return causa[s].length;
        })
        .reduce(function (vp, va) {
            return vp + va;
        }, 0);

    console.error(total);

    field_files.forEach(function (field) {

        causa[field].forEach(function (s) {
            var ruta = destino + id + "/" + path.basename(s),
                url = "http://www.tdlc.cl/DocumentosMultiples/" + querystring.escape(path.basename(s));

            if (files.checkFile(ruta)) {
                files_requested += 1;
            } else {
                request(url)
                    .on('error', function (err) {
                        console.error("Hubo un error");
                        console.error(err);
                    })
                    .pipe(fs.createWriteStream(ruta)).on("finish", function () {
                        if (files.checkFile(ruta)) {
                            console.error("Yahoooo");
                        } else {
                            console.error("buuuu");
                        }
                        files_requested += 1;
                        if (files_requested === total) {
                            done();
                        }
                    });
            }
        });
    });
    if (files_requested === total) {
        done();
    }
};


module.exports = {
    download: download
};