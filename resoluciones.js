var formatoFecha = function (fecha) {
    //TODO: Rellenar con 0 cuando corresponda
    return fecha;
};
var remove = function (arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) {
            arr.splice(i, 1);
        }
    }
};

var extraer = function (causa) {
    var result = {},
        escritos = causa.escritos;

    result.resoluciones = [];

    causa.resoluciones.forEach(function (s) {
        var fecha = s.substr(21, s.length - 3 - 21)
            .replace(/\./g, "")
            .replace(/ +/g, ' ')
            .trim()
            .replace(/ /g, '-');
        if (fecha.length < 10) fecha = formatoFecha(fecha);

        var esc = escritos.filter(function (e) {
            return e.fecha == fecha;
        });
        esc.forEach(function (e) {
            remove(escritos, e);
        });

        result.resoluciones.push({
            fecha: fecha,
            escritos: esc,
            file: s.replace("DocumentosMultiples", causa.numero)
        });
    });

    return result;
};

module.exports = {
    extraer: extraer
};