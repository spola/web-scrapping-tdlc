/* global: require */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var path = require("path");

//var id = 1759;

var exports = module.exports = {};

var extractTds = function ($, field, text, causa) {
    var elementos = [],
        tds = $("tr:contains(" + text + ")")
        .children()
        .last().find("td");
    if (tds.length > 0) {
        elementos = tds.map(function () {
            return $(this).text()
        }).get();
    } else {
        elementos = causa[field].split('\r\n');
    }

    causa[field] = elementos.map(function (s) {
        return s.trim();
    });
};


exports.download = function (id, folder, download, done) {

    var url_base = "http://www.tdlc.cl",
        url = url_base + "/Portal.Base/Web/VerContenido.aspx?ID=" + id + "&GUID=",
        files_requested = 0,
        fields = [
           'rol',
           'caratula',
           'fecha',
           'estado',
           'mercados',
           'conductas',
           'demandantes',
           'demandados',
           'demanda',
           'contestaciones',
           'informes',
           'documentos_relevantes',
           'auto_prueba',
           'obs_prueba',
           'vista',
           'presentaciones',
           'escritos',
           'resoluciones'
       ],
        field_files = [
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


    if (!fs.existsSync(folder + id + "/")) {
        fs.mkdirSync(folder + id + "/");
    }

    function checkFinished() {
        if (files_requested == 0) {
            setTimeout(function () {
                if (files_requested == 0) {
                    //console.info("Terminamos con " + id);
                    done();
                }
            }, 500);
        }
    }

    request(url, function (error, response, html) {
        if (error) {
            done(new Error(error));
            return;
        }
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        var $ = cheerio.load(html),
            $causa = $("#causas"),
            causa;


        causa = $(".causa").map(function () {

            // Let's store the data we filter into a variable so we can easily see what's going on.

            var causa = {};
            $(this).find("tbody").children().each(function (i) {
                //console.info(children.length);

                if (field_files.indexOf(fields[i]) > -1) {
                    causa[fields[i]] = $(this).children().last().find("a").map(function () {
                            var href = $(this).attr("href");
                            return href.indexOf(".pdf") > -1 || href.indexOf(".mp3") > -1 || href.indexOf(".doc") > -1 ? href : null;
                        })
                        .get()
                        .filter(function (s) {
                            return s != null
                        });

                    if (download) {
                        causa[fields[i]].forEach(function (s) {
                            var ruta = folder + id + "/" + path.basename(s);
                            files_requested++;
                            request(url_base + s).pipe(fs.createWriteStream(ruta)).on("finish", function () {
                                files_requested--;
                                checkFinished();
                            });
                        });
                    }
                } else {
                    causa[fields[i]] = $(this).children().last().text().trim();
                }
            });
            /*
                        causa.demandados = causa.demandados.split(",").map(function (s) {
                            return s.trim();
                        });;
                        causa.demandantes = causa.demandantes.split(",").map(function (s) {
                            return s.trim();
                        });
                        */

            extractTds($, "demandados", "Demandante(s) o Requirente(s)", causa);
            extractTds($, "demandantes", "Demandado(s) o Requerido(s)", causa);
            extractTds($, "mercados", "Mercados", causa);
            extractTds($, "conductas", "Conductas", causa);



            return causa;
        }).get(0);

        fs.writeFile(folder + id + '.json', JSON.stringify(causa, null, 4), function (err) {
            if (err) {
                console.error(err);
            }
            //console.log('File successfully written! - Check your project directory for the output.json file');
        });
        checkFinished();

        //console.info("ok");

    });
};