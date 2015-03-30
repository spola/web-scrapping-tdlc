/*jslint node: true*/
var checkJuridica = [
    "S.A.",
    "S.A",
    "LTDA.",
    "Ltda",
    "Limitada"
];
var alias = {
    "FNE": "Fiscalía Nacional Económica",
    "CHILETABACOS": "Compañía Chilena de Tabacos S.A.",
    "CHILE TABACOS": "Compañía Chilena de Tabacos S.A."
};
var mercados = {
    "Actividades de asociaciones (empresariales, profesionales, sindicales, etc)": 99999999,
    "Alimentos y Bebidas": 99999999,
    "Artículos deportivos": 99999999,
    "Artículos electrónicos, audio y video.": 99999999,
    "Combustibles, lubricantes y derivados del petróleo": 99999999,
    "Computación, programas,  equipos e insumos computacionales": 99999999,
    "Concesiones del Estado": 99999999,
    "Construcción y materiales de construcción.": 99999999,
    "Editorial": 99999999,
    "Educación": 99999999,
    "Eléctrico": 99999999,
    "Farmacéutico": 99999999,
    "Financiero": 99999999,
    "Hoteles y restaurantes": 99999999,
    "Importaciones": 99999999,
    "Inmobiliario": 99999999,
    "Maquinarias y otros bienes de capital": 99999999,
    "Minería": 99999999,
    "Ninguna": 99999999,
    "Obras Sanitarias": 99999999,
    "Otras actividades de servicios": 99999999,
    "Otros bienes de consumo": 99999999,
    "Portuario/aeroportuario": 99999999,
    "Prensa escrita": 99999999,
    "Recolección, transporte y disposición de residuos": 99999999,
    "Retail: comercialización al por menor en supermercados y tiendas por departamentos.": 99999999,
    "Ropa y calzado": 99999999,
    "Salud y medicina": 99999999,
    "Silvoagropecuario: Agricultura, ganadería, forestal": 99999999,
    "Tabaco": 99999999,
    "Telecomunicaciones": 99999999,
    "Transportes": 99999999,
    "Vehículos motorizados,repuestos, partes y piezas.": 99999999
};
var conductas = {
    "Abuso de posicion de dominio: Discriminaciones arbitrarias": 38,
    "Abuso de posicion de dominio: abuso de poder de compra": 99999999,
    "Abuso de posicion de dominio: negativa injustificada a contratar": 99999999,
    "Abuso de posición de dominio: imposición de cláusulas contractuales": 99999999,
    "Abuso de posición de dominio: otras prácticas exclusorias de competidores": 10243,
    "Abuso de posición de dominio: otras prácticas explotativas": 99999999,
    "Abuso de posición de dominio: ventas atadas": 99999999,
    "Actos de autoridad": 99999999,
    "Actos de competencia desleal": 99999999,
    "Acuerdos o prácticas concertadas": 34,
    "Barreras estratégicas a la entrada o expansión de competidores": 10244,
    "Incumplimiento de Instrucción o de Resolución": 10245,
    "Ninguna": 99999999,
    "Operaciones de Concentración": 99999999,
    "Prácticas predatorias y ventas bajo costo": 99999999,
    "Restricciones verticales con el objeto de excluir competidores": 99999999
};
var procedimientos = {
    "NC": "2",
    "C": "4"
};

var formasInicio = {
    "DEFAULT": 8,
    "Requerimiento": 7,
    "Demanda": 8
};

var tipoParte = {
    "7": {
        "demandados": 11471,
        "demandantes": 11472
    },
    "8": {
        "demandados": 45,
        "demandantes": 46
    }
};



module.exports = {
    checkJuridica: checkJuridica,
    alias: alias,
    mercados: mercados,
    conductas: conductas,
    procedimientos: procedimientos,
    formasInicio: formasInicio,
    tipoParte: tipoParte,
    ruta: "/Desarrollo/tdlc-wordpress/contensiosas/"
};