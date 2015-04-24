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
    "CHILE TABACOS": "Compañía Chilena de Tabacos S.A.",
    "MOVISTAR": "Telefónica Móviles Chile S.A.",
    "ENTEL": "Entel PCS Telecomunicaciones S.A.",
    "CLARO CHILE": "Claro Chile S.A.",
    "CLARO 1": "Claro Chile S.A.",
    "CLARO 2": "Claro Chile S.A.",
    "CLARO": "Claro Chile S.A.",
    "SCL TERMINAL AEREO DE SANTIAGO": "S.C.L. Terminal Aéreo de Santiago S.A. y otra",
    "QUIMICA LATINOAMERICANA": "Química Latinoamericana S.A.",
    "QUIMICA LATINOAMERICA": "Química Latinoamericana S.A.",
};
var mercados = {
    "Actividades de asociaciones (empresariales, profesionales, sindicales, etc)": 22221,
    
    "Alimentos y Bebidas": 22225,
    
    "Artículos deportivos": 99999999,
    "Artículos electrónicos, audio y video.": 99999999,
    "Combustibles, lubricantes y derivados del petróleo": 99999999,
    "Computación, programas,  equipos e insumos computacionales": 99999999,
    "Concesiones del Estado": 22222,
    "Concesiones": 99999999,
    
    "Construcción y materiales de construcción.": 99999999,
    "Materiales de construcción": 99999999,
    
    "Editorial": 99999999,
    "Educación": 99999999,
    "Eléctrico": 99999999,
    "Farmacéutico": 99999999,
    "Financiero": 99999999,
    "Hoteles y restaurantes": 99999999,
    "Importaciones": 99999999,
    "Inmobiliario": 22211,
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
    "Retail": 99999999,
    "Ropa y calzado": 99999999,
    "Salud y medicina": 99999999,
    "Silvoagropecuario: Agricultura, ganadería, forestal": 99999999,
    "Tabaco": 99999999,
    "Transportes": 22219,
    "Abuso de poder de compra": 99999999,
    "Vehículos motorizados,repuestos, partes y piezas.": 99999999,
    
    
//Suministros Energía Electrica	22218
//Seguros	22217
////Contrato de Distribución	22216
//Minero	22215
//Actividad Agropecuaria	22214
//Bancario y Financiero	22213
//Sociedades Comerciales	22212
//Notificación	22210    
    
    "Comercio: Supermercados":                          22226,
    "Comercio: otros mercados":                         22227,
    "Industria":                                        22228,
    "Industria: Alimenticia":                           22229,
    "Industria: Forestal":                              22230,
    "Medios de comunicación":                           22231,
    "Otros":                                            22232,
    "Telecomunicaciones":                               22233,
    "Transporte marítimo: Servicios Navieros":          22234,
    "Transporte terrestre":                             22235
};
var conductas = {
    "Abuso de Posición Dominante": 10246,
    "Abuso de posición dominante": 10246,
    "Abuso de posicion de dominio: Discriminaciones arbitrarias": 38,
    "Abuso de posicion de dominio: abuso de poder de compra": 99999999,
    "Abuso de posicion de dominio: negativa injustificada a contratar": 99999999,
    "Abuso de posición de dominio: imposición de cláusulas contractuales": 99999999,
    "Abuso de posición de dominio: otras prácticas exclusorias de competidores": 10243,
    "Abuso de posición de dominio: otras prácticas explotativas": 99999999,
    "Abuso de posición de dominio: ventas atadas": 99999999,
    "Actos de autoridad": 99999999,
    "Abuso de poder de compra": 99999999,
    "Actos de competencia desleal": 99999999,
    "Acuerdos o prácticas concertadas": 34,
    "Barreras estratégicas a la entrada o expansión de competidores": 10244,
    "Barreras a la Entrada": 10244,
    "Incumplimiento de Instrucción o de Resolución": 10245,
    "Incumplimiento condiciones": 99999999,
    "Incumplimiento de Resolución": 10245,
    "Ninguna": 99999999,
    "Operaciones de Concentración": 99999999,
    "Prácticas predatorias y ventas bajo costo": 99999999,
    "Colusión": 99999999,
    "Colusión en licitación": 99999999,
    "Restricciones verticales con el objeto de excluir competidores": 99999999,
    "Negativa de Contratación": 99999999,
    "Precios predatorios": 99999999,
    "estrangulamiento de márgenes": 99999999,
    "competencia desleal": 99999999,
    "Medida Prejudicial": 99999999,
    "Negativa de venta": 99999999,
    
    
"Abuso de Posición Dominante":                              45,                    
"Abuso de posición dominante":                              45,
"Abuso de poder de compra":                                 46,
"Colusión":                                                 47,
"Colusión en licitación":                                   48,    
"Incumplimiento condiciones":                               49,        
"Incumplimiento de Instrucción o de Resolución":            50,
    
"Medida Prejudicial":                                       51,
"Negativa de venta":                                        52,
"Precios predatorios":                                      53,
"competencia desleal":                                      35,
"estrangulamiento de márgenes":                             54       
    
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
        "demandados": 11472,
        "demandantes": 11471
    },
    "8": {
        "demandados": 46,
        "demandantes": 45
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
    ruta: "/Desarrollo/tdlc-node/web-scrapping-tdlc/",
    output: 'output/'
};