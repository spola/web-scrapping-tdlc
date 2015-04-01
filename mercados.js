/*jslint node: true*/
var constantes = require("./constantes"),
    mercadosBD = constantes.mercados;


var extract = function (mercados) {
    'use strict';
    return mercados
        .filter(function (s) {
            return s.trim() !== "";
        })
        .map(function (s) {

            var mercado = mercadosBD[s || "Ninguna"];
            if (!mercado) {
                throw new Error("Mercado no encontrada: " + s);
            }
            return {
                nombre: s,
                id: mercado
            };
        });
};

module.exports = {
    extract: extract
};