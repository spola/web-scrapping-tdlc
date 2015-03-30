/*jslint node: true*/
var constantes = require("./constantes"),
    conductasBD = constantes.conductas;


var extract = function (conductas) {
    'use strict';
    return conductas.map(function (s) {

        var conducta = conductasBD[s || "Ninguna"];
        if (!conducta) {
            throw new Error("Conducta no encontrada: " + s);
        }
        return {
            nombre: s,
            id: conducta
        };
    });
};

module.exports = {
    extract: extract
};