var constantes = require("./constantes"),
    procedimientosBD = constantes.procedimientos,
    formasInicioBD = constantes.formasInicio;


var extract = function (causa) {
    var rol = causa.rol,
        codigo = rol.split(" ")[0],
        fi = causa.caratula.split(" ")[0],
        inicio = formasInicioBD[fi] || formasInicioBD["DEFAULT"];

    return {
        nombre: codigo,
        id: procedimientosBD[codigo],
        inicio: inicio
    };
};

module.exports = {
    extract: extract
};