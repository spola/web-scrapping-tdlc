/*jslint node: true, vars: true*/
'use strict';
var glob = require("glob");
var path = require("path");
var fse = require('fs-extra');
var root = '/Users/SergioEsteban/Documents/Amilex/tdlc/Escritos/';
var dest = '/temp/asdd/';

//var faltantes = fse.readFileSync("./archivos_faltantes.txt");
//console.info(typeof (faltantes +""));
//faltantes = (faltantes + "").split("\n");

var options = {
    cwd: root
};

var faltantes = [
    'C 271-13',
    'C 273-14',
    'C 274-14',
    'C 275-15',
    'C 277-14',
    'C 278-14',
    'C 279-14',
    'C 280-14',
    'C 281-14',
    'C 282-14',
    'C 283-14',
    'C 284-14',
    'C 285-14',
    'C 286-14',
    'C 287-14',
    'C 288-14',
    'C 290-14',
    'C 291-15',
    'C 292-15',
    'C 293-15'
];
var numeros = [
    '4244',
    '4264',
    '4264',
    '4266',
    '4266',
    
    '4244',
    '4244',
    '4264',
    '4264',
    
    '4311',
    
    '4356',
    '4356',
    
    '4365',
    
    '4375',
    
    '4376',
    
    '4377',
    
    '4410',
    
    '4215',
    '4266',
    '4300',
    '4377',
    
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266',
    '4266'
];

faltantes = [
'C 273-14 29-01-2014 FNE.pdf' ,
'C 274-14 06-05-2014 CDF 2.pdf' ,
'C 274-14 11-03-2014 LA PLAZA S.A..pdf' ,
'C 275-13 03-07-2014 ENTEL.pdf' ,
'C 275-13 03-07-2014 CLARO CHILE.pdf' ,
'C 278-14 Requerimiento.pdf' ,
'C 279-14 05-08-2014 SMU.pdf' ,
'C 279-14 01-07-2014 FNE.pdf' ,
'C 280-14 Requerimiento de la FNE.pdf' ,
'c 281-14 22-07-2014 FNE.pdf' ,
'C 282-14 22-07-2014 FNE.pdf' ,
'C 283-14 22-07-2014 DELFOS TRANSPORTES LTDA..pdf' ,
'C 284-14 28-08-2014 FEDELECHE.pdf',
    
'Demanda de Netline Mobile S.A. contra Entel PCS Telecomunicaciones S.A. y otros.pdf' ,
'Demanda de Conadecus contra Telefonica Móviles Chile S.A. y Otros .pdf' ,
'DEMANDA DE INSERCO LIMITADA .pdf' ,
'Demanda_Delfos_C_283_14.pdf' ,

];


//faltantes = ['C 271-13'];
faltantes.forEach(function (file, idx) {
    glob("**/" + file + '', options, function (er, files) {
        files.forEach(function (s, i) {
            var f = path.basename(s, ".pdf");
            var origen = root + s;
            var destino = dest + numeros[idx] + "/" + f + ".pdf";
            fse.copySync(origen, destino);
            //console.info(destino);
        });
    });
    /*
    glob("** /" + file.toLowerCase() + '*.pdf', options, function (er, files) {
        files.forEach(function (s, i) {
            var f = path.basename(s, ".pdf");
            var origen = root + s;
            var destino = dest + numeros[idx] + "/" + f + ".pdf";
            fse.copySync(origen, destino);
        });
    });
*/
});

/*
// options is optional
glob("** /C 271-13*.pdf", options, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["** / *.js"]
    // er is an error object or null.
    console.info(files);

    files.forEach(function (file) {
        fse.copy(root + file, dest, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("success!");
        });
    });
});
*/