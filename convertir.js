/*jslint node: true*/
var fs = require("fs"),
    moduloEscritos = require("./escritos"),
    moduloResoluciones = require("./resoluciones"),
    moduloPartes = require("./partes"),
    moduloFiles = require("./files.js"),
    moduloMercados = require("./mercados.js"),
    moduloConductas = require("./conductas.js"),
    moduloProcedimiento = require("./procedimiento.js"),
    constantes = require("./constantes"),
    RUTA = constantes.ruta;

module.exports = function (grunt, NUMERO, done) {
    'use strict';
    var causa = grunt.file.readJSON(RUTA + NUMERO + ".json"),
        partes,
        escritos,
        resoluciones,
        cantDemandantes = causa.demandantes.length,
        cantDemandados = causa.demandados.length;

    causa.numero = NUMERO;
    //Acá se chequea que si la causa no tiene partes, se usan las que salgan de los escritos
    if ((cantDemandantes === 0 && cantDemandados === 0) || (cantDemandantes === 1 && causa.demandantes[0] === "" && cantDemandados === 1 && causa.demandados[0] === "")) {
        partes = moduloEscritos.extraerPartes(causa);
        causa.demandantes = partes.demandantes;
        causa.demandados = partes.demandados;
    }

    escritos = moduloEscritos.extraerEscritos(causa);
    resoluciones = moduloResoluciones.extraer(causa, escritos);

    causa.escritos = moduloFiles.extract(causa.escritos, causa.numero, false);
    //console.error(causa.escritos);

    causa.escritos = moduloEscritos.extraerEscritos(causa);
    causa.resoluciones = moduloResoluciones.extraer(causa, escritos);

    causa.procedimiento = moduloProcedimiento.extract(causa);

    causa.demandantes = moduloPartes.extract(causa, "demandantes");
    causa.demandados = moduloPartes.extract(causa, "demandados");


    causa.demanda = moduloFiles.extract(causa.demanda, causa.numero);
    causa.contestaciones = moduloFiles.extract(causa.contestaciones, causa.numero);
    causa.informes = moduloFiles.extract(causa.informes, causa.numero);
    causa.documentos_relevantes = moduloFiles.extract(causa.documentos_relevantes, causa.numero);
    causa.presentaciones = moduloFiles.extract(causa.presentaciones, causa.numero);
    causa.auto_prueba = moduloFiles.extract(causa.auto_prueba, causa.numero);
    causa.obs_prueba = moduloFiles.extract(causa.obs_prueba, causa.numero);

    causa.mercados = moduloMercados.extract(causa.mercados);
    causa.conductas = moduloConductas.extract(causa.conductas);




    fs.writeFile('test/output/' + NUMERO + '.json', JSON.stringify(causa, null, 4), function (err) {
        if (err) {
            console.error(err);
        }
        done();
        //console.log('File successfully written! - Check your project directory for the output.json file');
    });
};