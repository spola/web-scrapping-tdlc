var fs = require("fs");

var files = [
'22042015010037972.xml',
'22042015010102600.xml',
'22042015010128331.xml',
'22042015010305381.xml',
'22042015010347641.xml',
'22042015010410870.xml',
'22042015010452477.xml',
'22042015010518653.xml',
'22042015010603871.xml',
'22042015010647987.xml',
'22042015010717532.xml',
'22042015010844734.xml',
'22042015010858838.xml',
'22042015010914137.xml',
'22042015010920862.xml',
'22042015010943047.xml',
'22042015011000618.xml',
'22042015011044729.xml',
'22042015011049448.xml',
'22042015011115074.xml',
'22042015011117963.xml',
'22042015011158895.xml',
'22042015011225968.xml',
'22042015011258536.xml',
'22042015011420635.xml',
'22042015011441374.xml',
'22042015011457813.xml',
'22042015011633358.xml',
'22042015011647397.xml',
'22042015011714931.xml',
'22042015011757414.xml',
'22042015011850991.xml',
'22042015011910634.xml',
'22042015011947938.xml',
'22042015012027962.xml',
'22042015012107356.xml',
'22042015012149584.xml',
'22042015012156097.xml',
'22042015012207445.xml',
'22042015012303325.xml',
'22042015012315526.xml',
'22042015012343413.xml',
'22042015012350825.xml',
'22042015012441997.xml',
'22042015012608525.xml',
'22042015012622881.xml',
'22042015012708617.xml',
'22042015012840897.xml',
'22042015012901658.xml',
'22042015012928446.xml',
'22042015013019407.xml',
'22042015013143658.xml',
'22042015013245170.xml',
'22042015013437114.xml',
'22042015013506508.xml',
'22042015013529639.xml',
'22042015013534589.xml',
'22042015013612279.xml',
'22042015013640549.xml',
'22042015013700327.xml',
'22042015013717211.xml',
'22042015013747068.xml',
'22042015013836049.xml',
'22042015013901169.xml',
'22042015013913729.xml',
'22042015013945849.xml',
'22042015014001279.xml',
'22042015014011764.xml',
'22042015014012330.xml',
'22042015014013520.xml',
'22042015014022248.xml',
'22042015014024466.xml',
'22042015014029468.xml',
//'22042015014029750.xml',
'22042015014037589.xml',
'22042015014041265.xml',
'22042015014121809.xml',
'22042015014143192.xml',
'22042015014206900.xml',
'22042015014227289.xml',
'22042015014230290.xml',
'22042015014233749.xml',
'22042015014258350.xml',
'22042015014316361.xml',
'22042015014330830.xml',
'22042015014335339.xml',
'22042015014351867.xml',
'22042015014429101.xml',
'22042015014449391.xml',
'22042015014507001.xml',
'22042015014511269.xml',
'22042015014515580.xml',
'22042015014537160.xml',
'22042015014600160.xml',
'22042015014621326.xml',
'22042015014633020.xml',
'22042015014639860.xml',
'22042015014643930.xml'
];


//files = ['22042015010037972.xml'];


var datum = []
files.forEach(function (file) {
    var json = loadXMLDoc("/Desarrollo/tmp/xml/" + file);
    json = JSON.parse(json);

    for (var i in json) {
        console.info(i);
    }

    var data = json.rwd.archivo
        .filter(function (archivo) {
            return archivo.header[0].codTribunal[0] !== 1000;
        })
        .filter(function (archivo) {
            return archivo.header[0].codTribunal[0] !== 9 || archivo.header[0].codTribunal[0] !== 22;
        })
        .map(function (archivo) {
            var header = archivo.header[0];
            return {
                id: header.idDoc[0],
                size: header.filesizeDoc[0],
                xml: file,
                //texto: archivo.texto[0]
            };
        });

    var rep = {}, rep1 = [];
    data.forEach(function (d) {
        if (!rep[d.size]) {
            rep[d.size] = [];
        }
        rep[d.size].push(d);
    });
    
    for(var i in rep) {
        if(!rep.hasOwnProperty(i)) continue;
        rep1.push(rep[i]);
    };
    
    rep1.filter(function (d) {
            return d.length > 1;
        })
        .forEach(function (d) {
            console.info(d);
            datum = Array.prototype.concat.apply(datum, d);
        });


    //datum.push(data);
});


var merge = Array.prototype.concat.apply([], datum);

fs.writeFileSync("sacar_repetidos.txt",
    merge.map(function (s) {
        return s.id + "\t" +
            s.size + "\t" +
            s.xml + "\t";
    })
    .join("\n")
);


function loadXMLDoc(filePath) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var json;
    try {
        var fileData = fs.readFileSync(filePath, 'ascii');

        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = JSON.stringify(result);
            //console.info(result);
        });

        console.log("File '" + filePath + "/ was successfully read.\n");
        return json;
    } catch (ex) {
        console.log(ex)
    }
}