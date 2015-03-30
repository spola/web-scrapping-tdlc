var constantes = require("./constantes"),
    checkJuridica = constantes.checkJuridica,
    tipoParte = constantes.tipoParte;

var isJuridica = function (s) {
    if (s == "Fiscalía Nacional Económica") return true;

    for (var i = 0; i < checkJuridica.length; i++) {
        if (s.indexOf(checkJuridica[i]) > -1) {
            return true;
        }
    }
    return false;
};

module.exports = {
    extract: function (causa, cod) {
        var partes = causa[cod];

        return causa[cod].map(function (s) {
            return {
                nombre: s,
                esJuridica: isJuridica(s),
                tipo: tipoParte[causa.procedimiento.inicio][cod]
            };
        });
    }
};