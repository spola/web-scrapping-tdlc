/*jslint plusplus: true*/
/*global module, require, console*/

var convertir = require("./convertir.js"),
    path = require("path"),
    fs = require("fs");

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({});

    grunt.registerTask('default', function () {
        require("./log.js").reset();

        var contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [2237];
        ids.forEach(function (id) {
            try {
                convertir(grunt, id, done);
            } catch (e) {
                console.error(id);
                console.error(e);
                console.error(e.stack);
            }
        });
    });

    grunt.registerTask("generar-lista", function () {
        var archivos = [],
            data;

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        grunt.file.recurse("/Desarrollo/tdlc-wordpress/contensiosas/", function (abspath, rootdir, subdir, filename) {
            if (!grunt.file.isFile(abspath)) {
                return;
            }
            if (!endsWith(abspath, ".json")) {
                return;
            }

            archivos.push(Number(path.basename(abspath, ".json")));
        });
        //console.info(archivos);

        data = archivos.join('\n');
        grunt.file.write("/Desarrollo/tdlc-causas/test/contensiosas.original.txt", data);
        grunt.file.write("/Desarrollo/tdlc-causas/test/contensiosas.txt", data);
    });

    grunt.registerTask("descargar-contensiosa", function () {
        var destino = "/Desarrollo/tdlc-wordpress/contensiosas/",
            download = require("./download_contensiosas.js").download,
            contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [1533];
        ids.forEach(function (id) {
            //console.info("downloading " + id);
            download(id, destino, false, function (e) {
                if (e) {
                    console.error(id);
                    console.error(e);
                }

                total--;
                if (total === 0) {
                    done();
                }
            });
        });
    });

    grunt.registerTask("descargar-contensiosa-json", function () {
        var destino = "/Desarrollo/tdlc-wordpress/contensiosas/",
            download = require("./download_contensiosas.js").download,
            contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        ids = [3947];
        ids.forEach(function (id) {
            //console.info("downloading " + id);
            download(id, destino, false, function (e) {
                if (e) {
                    console.error(id);
                    console.error(e);
                }

                total--;
                if (total === 0) {
                    done();
                }
            });
        });
    });

    grunt.registerTask("descargar-contensiosa-files", function () {
        var destino = "/Desarrollo/tdlc-wordpress/contensiosas/",
            download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [3947];
        ids.forEach(function (id) {
            var json = grunt.file.readJSON(destino + id + ".json");
            //console.info("downloading " + id);
            download(id, json, destino, function (e) {
                if (e) {
                    console.error(id);
                    console.error(e);
                }

                total--;
                if (total === 0) {
                    done();
                }
            });
        });
    });

    grunt.registerTask("generar-conductas", function () {
        var log = require("./log.js"),
            destino = "/Desarrollo/tdlc-wordpress/contensiosas/",
            download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            total = ids.length,
            conductas = [];

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [3947];
        ids.forEach(function (id) {
            var json = grunt.file.readJSON(destino + id + ".json");
            //console.info(json.conductas)
            conductas = conductas.concat(json.conductas);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        conductas = conductas
            .filter(function (s) {
                return s !== "";
            })
            .filter(onlyUnique)
            .sort()
            .forEach(function (s) {
                log.log(s);
            });
    });
    grunt.registerTask("generar-mercados", function () {
        var log = require("./log.js"),
            destino = "/Desarrollo/tdlc-wordpress/contensiosas/",
            download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read("/Desarrollo/tdlc-causas/test/contensiosas.txt"),
            ids = contenido.split("\n"),
            total = ids.length,
            mercados = [];

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [3947];
        ids.forEach(function (id) {
            var json = grunt.file.readJSON(destino + id + ".json");
            //console.info(json.conductas)
            mercados = mercados.concat(json.mercados);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        mercados = mercados
            .filter(function (s) {
                return s !== "";
            })
            .filter(onlyUnique)
            .sort()
            .forEach(function (s) {
                log.log(s);
            });
    });

};