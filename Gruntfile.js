/*jslint plusplus: true*/
/*global module, require, console*/

var convertir = require("./convertir.js"),
    path = require("path"),
    fs = require("fs"),
    constantes = require("./constantes"),
    root = constantes.ruta,
    output = root + constantes.output,
    lista = root + "contensiosas.txt";

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({});

    grunt.registerTask('default', function () {
        require("./log.js").reset();

        var contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = ['4215'];
        ids.forEach(function (id) {
            id = id.trim();
            if (isNaN(id)) {
                return;
            }
            try {
                convertir(grunt, id, done);
                console.info("Convertido " + id);
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

        grunt.file.recurse(root, function (abspath, rootdir, subdir, filename) {
            if (!grunt.file.isFile(abspath)) {
                return;
            }
            if (!endsWith(abspath, ".json")) {
                return;
            }

            archivos.push(Number(path.basename(abspath, ".json")));
        });

        data = archivos.join('\n');
        grunt.file.write(lista, data);
    });

    grunt.registerTask("descargar-contensiosa", function () {
        var download = require("./download_contensiosas.js").download,
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [1533];
        ids.forEach(function (id) {
            //console.info("downloading " + id);
            download(id, output, false, function (e) {
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
        var download = require("./download_contensiosas.js").download,
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = ["4502", "4528", "4504" ];
        ids.forEach(function (id) {
            //console.info("downloading " + id);
            download(id.trim(), output, false, function (e) {
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
        var download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            done = this.async();

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = ["4502", "4528", "4504", "4215" ];
        ids.forEach(function (id) {
            if (isNaN(id)) {
                return;
            }
            id = id.trim();
            var json = grunt.file.readJSON(output + id + ".json");
            //console.info("downloading " + id);
            download(id, json, output, function (e) {
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
            //download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            conductas = [];

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [3947];
        ids.forEach(function (id) {
            id = Number(id);
            if (isNaN(id)) return;

            var json = grunt.file.readJSON(output + id + ".json");
            //console.info(json.conductas)
            conductas = conductas.concat(json.conductas);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        log.reset();
        conductas = conductas
            .filter(function (s) {
                return s !== "";
            })
            .filter(onlyUnique)
            .sort()
            .forEach(function (s) {
                log.logSync(s);
                console.info(s);
            });
    });
    grunt.registerTask("generar-mercados", function () {
        var log = require("./log.js"),
            //download = require("./download_contensiosas_archivos.js").download,
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            mercados = [];

        //ids = ids.slice(0, 10);
        //ids = [1409, 1428, 1456, 1458, 1517, 1533, 1547];
        //ids = [3947];
        ids.forEach(function (id) {
            id = Number(id);
            if (isNaN(id)) return;

            var json = grunt.file.readJSON(output + id + ".json");
            //console.info(json.conductas)
            mercados = mercados.concat(json.mercados);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        log.reset();
        mercados = mercados
            .filter(function (s) {
                return s !== "";
            })
            .filter(onlyUnique)
            .sort()
            .forEach(function (s) {
                log.logSync(s);
                console.info(s);
            });
    });

    grunt.registerTask("rellenar", function () {
        var archivos = [],
            data;

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        /*grunt.file.recurse(output, function (abspath, rootdir, subdir, filename) {
            if (!grunt.file.isFile(abspath)) {
                return;
            }
            if (!endsWith(abspath, ".json")) {
                return;
            }
            if (endsWith(abspath, ".out.json")) {
                return;
            }
            if (!endsWith(abspath, ".bkp.json")) {
                return;
            }

            archivos.push((path.basename(abspath, ".bkp.json")));
        });*/


        var contenido = grunt.file.read("/temp/Book1.csv").split("\r\n");
        contenido.forEach(function (l) {
            if (l === "") return;
            var celdas = l.split(";"),
                numero = celdas[0],
                conductas = celdas[2].split(","),
                mercados = celdas[3].split(","),
                demandantes = celdas[4].split(","),
                demandados = celdas[5].split(","),
                causa;

            console.info(conductas, mercados);

            causa = grunt.file.readJSON(output + numero + ".bkp.json");

            causa.conductas = conductas.map(function (s) {
                return s.trim();
            }).filter(function (s) {
                return s !== "";
            });
            causa.mercados = mercados.map(function (s) {
                return s.trim();
            }).filter(function (s) {
                return s !== "";
            });
            causa.demandantes = demandantes.map(function (s) {
                return s.trim();
            }).filter(function (s) {
                return s !== "";
            });
            causa.demandados = demandados.map(function (s) {
                return s.trim();
            }).filter(function (s) {
                return s !== "";
            });


            fs.writeFileSync(output + numero + '.json', JSON.stringify(causa, null, 4));


        });
    });

    grunt.registerTask("generar-catastro", function () {
        var log = require("./log.js"),
            files = require("./files.js"),
            contenido = grunt.file.read(lista),
            ids = contenido.split("\n"),
            total = ids.length,
            mercados = [],
            chekeo,
            lineas = [];

        chekeo = function (causa, tipo) {
            return function (s) {
                log.logSync(s);
                var file = s.substr("/DocumentosMultiples/".length);
                if (!files.checkFile( "./output/" + causa.numero + "/" + file)) {
                    
                    lineas.push(
                        causa.numero + ";" +
                        causa.rol + ";" +
                        tipo + ";" +
                        file
                    );
                }
            }
        };

        log.reset();
        ids.forEach(function (id) {
            id = Number(id);
            if (isNaN(id)) return;

            var causa = grunt.file.readJSON(output + id + ".json");
            causa.numero = id;

            /*log.logSync(
                causa.numero + ";" +
                causa.rol + ";" +
                causa.escritos.length + ";" +
                causa.resoluciones.length + ";" +
                causa.demanda.length + ";"
            );
*/
            causa.escritos.forEach(chekeo(causa, "escrito"));
            causa.resoluciones.forEach(chekeo(causa, "resolución")); 
            causa.demanda.forEach(chekeo(causa, "demanda"));
        });
        
        lineas.forEach(function(linea) {
            log.logSync(linea);
        });
    });
    
    grunt.registerTask("copiar-escritos", function() {
         var log = require("./log.js"),
            files = require("./files.js"),
            contenido = grunt.file.read(root + "archivos_faltantes.txt"),
            archivos = contenido.split("\n"),
            total = archivos.length,
            mercados = [],
            chekeo,
            lineas = [];
        
                        var archivos = [],
            data;

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
        //This sets up the file finder
        var finder = require('findit').find(__dirname);

        //This listens for directories found
        finder.on('directory', function (dir) {
          console.log('Directory: ' + dir + '/');
        });

        //This listens for files found
        finder.on('file', function (file) {
          console.log('File: ' + file);
        });

        grunt.file.recurse("/Users/SergioEsteban/Documents/Amilex/tdlc/Escritos/", function (abspath, rootdir, subdir, filename) {
            if (!grunt.file.isFile(abspath)) {
                return;
            }
            if (!endsWith(abspath, ".json")) {
                return;
            }

            archivos.push(Number(path.basename(abspath, ".json")));
        });

        data = archivos.join('\n');
        grunt.file.write(lista, data);
    });
};