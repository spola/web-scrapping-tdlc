/*jslint node: true, plusplus: true, vars: true*/
var fuzzysearch = require("fuzzysearch"),
    constantes = require("./constantes"),
    moduloFiles = require("./files"),
    log = require("./log.js").log;

var checkJuridica = constantes.checkJuridica;
var alias = constantes.alias;


var limpiarNeedle = function (needle, replaceJuridica) {
    'use strict';
    replaceJuridica = replaceJuridica === false ? false : true;
    var idx = needle.toLocaleLowerCase().indexOf("parte");

    if (idx !== -1) {
        needle = needle.substr(0, idx);
    }
    idx = needle.toLocaleLowerCase().indexOf("part");
    if (idx !== -1) {
        needle = needle.substr(0, idx);
    }

    if (replaceJuridica) {
        checkJuridica.forEach(function (s) {
            needle = needle.replace(s, '');
        });
    }

    needle = needle
        .replace(/[0-9]/ig, '')
        .replace(/\./g, ' ')
        .replace(/ +/g, ' ');



    return needle.trim();
};

var encontrarParte = function (candidato, partes) {
    'use strict';
    var needle = limpiarNeedle(candidato).toLowerCase();

    var prts = partes.filter(function (haystack) {
        var idx = haystack.toLocaleLowerCase().indexOf(needle);
        if (idx !== -1) {
            return true;
        }

        return fuzzysearch(needle, haystack.toLowerCase());
    });
    return prts;
};

function encontrarParteAlias(candidato, partes) {
    'use strict';
    
    candidato = limpiarNeedle(candidato);

    if (alias[candidato]) {
        return encontrarParte(alias[candidato], partes);
    }
    var parte = encontrarParte(candidato, partes);
    //    if (!parte || parte == "") {
    //        console.info(candidato);
    //        console.info(partes);
    //    }
    return parte;
}
var mapArchivoEscrito = function(causa) {
    return function(s) {
        var result = {
            file: s//.replace(causa.numero, causa.numero)
        };
        //Martillazos
        s = s.replace("/DocumentosMultiples/C2", "/DocumentosMultiples/C");
        s = s.replace("/DocumentosMultiples/vC", "/DocumentosMultiples/C");

        var resto;
        s = s.substr(21)
            .replace(/ +/g, ' ')
            .replace(causa.rol, '')
            .replace(causa.rol.toLowerCase(), '')
            .replace(causa.rol.replace(/ +/g, ''), '')
            .replace(causa.rol.toLowerCase().replace(/ +/g, ''), '')
            .trim();
        if (/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(s) || /[0-9]{2} [0-9]{2} [0-9]{4}/.test(s)) {
            result.fecha = s.substr(0, 10);
            resto = s.substr(10);
        } else if (/[0-9]{2}-[0-9]{2}-[0-9]{2}/.test(s) || /[0-9]{2} [0-9]{2} [0-9]{2}/.test(s) || /[0-9]{2}\.[0-9]{2}\.[0-9]{2}/.test(s)) {
            result.fecha = s.substr(0, 6);
            result.fecha += "20" + s.substr(6, 2);
            resto = s.substr(8);
        } else if (/[0-9]{1}-[0-9]{2}-[0-9]{4}/.test(s) || /[0-9]{2} [0-9]{2} [0-9]{4}/.test(s)) {
            result.fecha = s.substr(0, 9);
            resto = s.substr(10);
        }
        try {
            result.extension = resto.substr(resto.length - 3);
            result.parte = resto.substr(0, resto.length - 4);
        } catch (e) {
            console.error("-->" + s);
            console.error("-->" + resto);
            throw e;
        }

        return result;
    };
};

var extraerEscritos = function (causa) {
    'use strict';
    
    var partes = causa.demandantes.concat(causa.demandados);
    var result = causa.escritos
        .filter(function (s) {
            if (moduloFiles.fileSize(s, causa.numero) < 2000) {
                return false;
            } else {
                return true;
            }
        })
        .map(mapArchivoEscrito(causa))
        .map(function (e) {
            e.parte = encontrarParteAlias(e.parte, partes)[0];
            if (!e.parte || e.parte == "") {
                //log(causa.numero + "\t" + "SP" + "\t" + e.file);
                return null;
            }
            return e;
        })
        .filter(function (e) {
            return e != null;
        })
        .map(function (e) {
            e.fecha = e.fecha.replace(/ /g, "-");
            return e;
        });
    return result;
};
var extraerPartes = function (causa) {
    var result = {
        demandantes: [],
        demandados: []
    };
    causa.escritos
        .map(mapArchivoEscrito(causa))
        .map(function (e) {
            e = e.parte;
            var mialias = alias[e];
            if (mialias) return mialias;
            e = limpiarNeedle(e, false);

            mialias = alias[e];
            if (mialias) return mialias;
            return e;
        })
        .map(function (s) {
            return s.toLowerCase();
        })
        .filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }).forEach(function (s) {
            if (s == "Fiscalía Nacional Económica".toLowerCase()) result.demandantes.push("Fiscalía Nacional Económica");
            else result.demandados.push(s);
        });
    return result;
};


module.exports = {
    match: function (needle, haystack) {
        return encontrarParteAlias(needle, haystack);
    },
    extraerEscritos: extraerEscritos,
    extraerPartes: extraerPartes
};