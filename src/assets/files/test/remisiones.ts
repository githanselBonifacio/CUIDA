import { Remision } from "src/app/admin/interfaces/remision.interface"

export const dataActualRemision = {

    "idRemision": "777777",
    "estado": "ADMITIDO",
    "fechaAdmision": "2023-07-07",
    "programa": "Agudos",
    "tipoAdmision": "Domiciliario",
    "institucionRemite": "SALUD EN CASA BARRANQUILLA",
    "paciente": {
        "tipoIdentificacion": "Cédula ciudadania",
        "numeroIdentificacion": "717171",
        "nombres": "Pablo Andres",
        "apellidos": "Granados Castilla",
        "edad": "28",
        "sexo": "Masculino",
        "peso": "82",
        "tipoAfiliacion": "POS",
        "nombreAseguradora": "EPS MEDICINA PREPAGADA SURAMERICANA SA PRUEBA ACTUALIZACION",
        "fechaNacimiento": "1996-07-10"
    },
    "ubicacionPaciente": {
        "latitud": 10.988778,
        "longitud": -74.814696,
        "direccion": "Calle 76 #39-125",
        "tipoVia": "Calle",
        "numero1": "72",
        "numero2": "125",
        "barrio": "Buena Esperanza",
        "sinNomenclatura": true,
        "municipio": "BARRANQUILLA",
        "idRegional": "427"
    },
    "datosAtencion": {
        "idDatosAtencion": 145,
        "nombreCuidador": "Carlos Camilo duarte Ramirez",
        "nombreResponsable": "Carlos Camilo duarte Ramirez",
        "telefonoPaciente": "300945645",
        "celularPaciente": "3045848541",
        "celularPaciente2": "",
        "idRemision": "777777"
    },
    "diagnosticos": [
        {
            "codigo": "P271",
            "idRemision": "777777",
            "nombreDiagnostico": "DISPLASIA BRONCOPULMONAR ORIGINADA EN EL PERIODO PERINATAL"
        }
    ],
    "citas": [
        {
            "idCita": "777777-4",
            "idRemision": "777777",
            "duracion": 2700,
            "holgura": 900,
            "fechaInicio": "2023-09-02 12:30",
            "fechaProgramada": "2023-09-02 12:30",
            "latitud": 10.988778,
            "longitud": -74.814696,
            "especialidad": "Enfermeria",
            "idEstado": 1,
            "idRegional": "427",
            "idHorarioTurno": null,
            "idProfesional": null,
            "idConductor": null,
            "tratamientos": [],
            "procedimientos": {
                "curaciones": [
                    {
                        "idCita": "777777-4",
                        "tipoCuracion": "Herida Mayor segunda sesion",
                        "descripcion": "asdas",
                        "sesiones": 4
                    }
                ],
                "fototerapias": [],
                "sondajes": [],
                "secreciones": [
                    {
                        "idCita": "777777-4",
                        "diasTratamiento": 20,
                        "envioAspirador": true,
                        "visitaEnfermeria": true,
                        "tipoSonda": "Adulto",
                        "nasal": false,
                        "traqueostomia": true,
                        "tipoPrestacion": "Secrecion"
                    }
                ],
                "tomaMuestras": [],
                "soporteNutricionales": [
                    {
                        "medicamento": {
                            "idMedicamento": "54421",
                            "nombre": "NUTREN 1.0",
                            "presentacion": "500 ML SOLUCION",
                            "codigoMedicamento": "190199"
                        },
                        "cantidadDosis": 1,
                        "unidadDosis": "Bolsas",
                        "tipo": "Enteral",
                        "descripcion": "S.O.G",
                        "duracion": 60,
                        "volumen": 88,
                        "noPBS": false,
                        "tipoPrestacion": "Sondaje"
                    }
                ],
                "canalizaciones": [
                    {
                        "idCita": "777777-4",
                        "tipoCanalizacion": "Intravenosa",
                        "tipoPrestacion": "Canalizacion"
                    }
                ]
            }
        }

    ]

}

export const historialRemision = [
    {
        "idRemision": "777777",
        "estado": "ADMITIDO",
        "fechaAplicacionNovedad": "2023-08-30T06:00:00",
        "motivoNovedad": "Cambio plan de manejo prueba 1",
        "fechaAdmision": "2023-07-07",
        "programa": "Agudos",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA",
        "paciente": {
            "tipoIdentificacion": "CÃ©dula ciudadania",
            "numeroIdentificacion": "717171",
            "nombres": "Pruebas remision",
            "apellidos": "api cuida",
            "edad": "25",
            "sexo": "Masculino",
            "peso": "60",
            "tipoAfiliacion": "POS",
            "nombreAseguradora": "EPS MEDICINA PREPAGADA SURAMERICANA SA",
            "fechaNacimiento": "1996-07-07"
        },
        "ubicacionPaciente": {
            "barrio": "Olaya",
            "latitud": 10.988777,
            "numero1": "72",
            "numero2": "125",
            "tipoVia": "Calle",
            "longitud": -74.814695,
            "direccion": "Calle 72 #38-125",
            "municipio": "BARRANQUILLA",
            "idRegional": "427",
            "sinNomenclatura": true
        },
        "datosAtencion": {
            "idRemision": "777777",
            "nombreCuidador": "Carlos Albero duarte Ramirez",
            "celularPaciente": "3144676340",
            "idDatosAtencion": 145,
            "celularPaciente2": "",
            "telefonoPaciente": "3144676340",
            "nombreResponsable": "Carlos Albero duarte Ramirez"
        },
        "diagnosticos": [
            {
                "codigo": "P271",
                "idRemision": "777777",
                "nombreDiagnostico": "DISPLASIA BRONCOPULMONAR ORIGINADA EN EL PERIODO PERINATAL"
            },
            {
                "codigo": "E859",
                "idRemision": "777777",
                "nombreDiagnostico": "AMILOIDOSIS, NO ESPECIFICADA"
            }
        ],
        "citas": [
            {
                "idCita": "777777-1",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-15 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 100,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-1",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-1",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-1",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-1",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-1",
                            "tipoMuestra": "Sangre",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-1",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "250 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-15 11:50"
            },
            {
                "idCita": "777777-2",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-16 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-2",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-2",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-2",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-2",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-2",
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-2",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-16 11:50"
            },
            {
                "idCita": "777777-3",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-17 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-3",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-3",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-3",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-3",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-3",
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-3",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-17 11:50"
            }
        ],
        "citasNuevas": [
            {
                "idCita": "777777-4",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-02 12:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-02 12:30"
            },
            {
                "idCita": "777777-5",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-05 14:00",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": null,
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [],
                    "secreciones": [],
                    "fototerapias": [
                        {
                            "idCita": null,
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": null,
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-05 14:00"
            },
            {
                "idCita": "777777-6",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-06 10:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "Acetaminofen",
                            "presentacion": "100 MG inyectable",
                            "idMedicamento": "845454",
                            "codigoMedicamento": "54545415"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 20,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    },
                    {
                        "noPBS": false,
                        "duracion": 1,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "Amikacina",
                            "presentacion": "100 MG inyectable",
                            "idMedicamento": "545415",
                            "codigoMedicamento": "54541528"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 2,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [
                        {
                            "idCita": null,
                            "tipoMuestra": "Sangre",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": []
                },
                "fechaProgramada": "2023-09-06 10:30"
            },
            {
                "idCita": "777777-7",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-15 12:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-15 12:30"
            }
        ]
    },
    {
        "idRemision": "777777",
        "estado": "ADMITIDO",
        "fechaAplicacionNovedad": "2023-08-30T06:00:00",
        "motivoNovedad": "Cambio plan de manejo prueba 1",
        "fechaAdmision": "2023-07-07",
        "programa": "Agudos",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA",
        "paciente": {
            "tipoIdentificacion": "CÃ©dula ciudadania",
            "numeroIdentificacion": "717171",
            "nombres": "Pruebas remision",
            "apellidos": "api cuida",
            "edad": "25",
            "sexo": "Masculino",
            "peso": "60",
            "tipoAfiliacion": "POS",
            "nombreAseguradora": "EPS MEDICINA PREPAGADA SURAMERICANA SA",
            "fechaNacimiento": "1996-07-07"
        },
        "ubicacionPaciente": {
            "barrio": "Olaya",
            "latitud": 10.988777,
            "numero1": "72",
            "numero2": "125",
            "tipoVia": "Calle",
            "longitud": -74.814695,
            "direccion": "Calle 72 #38-125",
            "municipio": "BARRANQUILLA",
            "idRegional": "427",
            "sinNomenclatura": true
        },
        "datosAtencion": {
            "idRemision": "777777",
            "nombreCuidador": "Carlos Albero duarte Ramirez",
            "celularPaciente": "3144676340",
            "idDatosAtencion": 145,
            "celularPaciente2": "",
            "telefonoPaciente": "3144676340",
            "nombreResponsable": "Carlos Albero duarte Ramirez"
        },
        "diagnosticos": [
            {
                "codigo": "P271",
                "idRemision": "777777",
                "nombreDiagnostico": "DISPLASIA BRONCOPULMONAR ORIGINADA EN EL PERIODO PERINATAL"
            },
            {
                "codigo": "E859",
                "idRemision": "777777",
                "nombreDiagnostico": "AMILOIDOSIS, NO ESPECIFICADA"
            }
        ],
        "citas": [
            {
                "idCita": "777777-1",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-15 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 100,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-1",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-1",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-1",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-1",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-1",
                            "tipoMuestra": "Sangre",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-1",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "250 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-15 11:50"
            },
            {
                "idCita": "777777-2",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-16 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-2",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-2",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-2",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-2",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-2",
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-2",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-16 11:50"
            },
            {
                "idCita": "777777-3",
                "holgura": 900,
                "latitud": 10.988777,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814695,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-10-17 11:50",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": "777777-3",
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [
                        {
                            "idCita": "777777-3",
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": "777777-3",
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [
                        {
                            "idCita": "777777-3",
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": "777777-3",
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": "777777-3",
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-10-17 11:50"
            }
        ],
        "citasNuevas": [
            {
                "idCita": "777777-4",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-02 12:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-02 12:30"
            },
            {
                "idCita": "777777-5",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-05 14:00",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "SYNAGIS",
                            "presentacion": "100 MG POLVO PARA INYECCION",
                            "idMedicamento": "53438",
                            "codigoMedicamento": "1266366"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 200,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [
                        {
                            "idCita": null,
                            "tipoSonda": "Toma de Muestra",
                            "tipoSondaje": "Sonda NasogÃ¡strica (BK)",
                            "totalSesiones": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ],
                    "curaciones": [],
                    "secreciones": [],
                    "fototerapias": [
                        {
                            "idCita": null,
                            "cantidadDosis": 2,
                            "tipoFrecuencia": "4x4",
                            "tipoPrestacion": "Fototerapia",
                            "diasTratamiento": 2
                        }
                    ],
                    "tomaMuestras": [
                        {
                            "idCita": null,
                            "tipoMuestra": "Orina",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-05 14:00"
            },
            {
                "idCita": "777777-6",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-06 10:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [
                    {
                        "noPBS": false,
                        "duracion": 5,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "Acetaminofen",
                            "presentacion": "100 MG inyectable",
                            "idMedicamento": "845454",
                            "codigoMedicamento": "54545415"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 20,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    },
                    {
                        "noPBS": false,
                        "duracion": 1,
                        "frecuencia": "Mensual",
                        "notificado": false,
                        "medicamento": {
                            "nombre": "Amikacina",
                            "presentacion": "100 MG inyectable",
                            "idMedicamento": "545415",
                            "codigoMedicamento": "54541528"
                        },
                        "unidadDosis": "mg",
                        "cantidadDosis": 2,
                        "tipoPrestacion": "AplicacionMedicamentos",
                        "tipoTratamiento": "MEDICAMENTOS",
                        "viaAdministracion": "I.M."
                    }
                ],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [
                        {
                            "idCita": null,
                            "tipoMuestra": "Sangre",
                            "requiereAyuno": false,
                            "tipoPrestacion": "TomaMuestra"
                        }
                    ],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": []
                },
                "fechaProgramada": "2023-09-06 10:30"
            },
            {
                "idCita": "777777-7",
                "holgura": 900,
                "latitud": 10.988778,
                "duracion": 2700,
                "idEstado": 1,
                "longitud": -74.814696,
                "idRegional": "427",
                "idRemision": "777777",
                "fechaInicio": "2023-09-15 12:30",
                "idConductor": null,
                "especialidad": "Enfermeria",
                "tratamientos": [],
                "idProfesional": null,
                "idHorarioTurno": null,
                "procedimientos": {
                    "sondajes": [],
                    "curaciones": [
                        {
                            "idCita": null,
                            "sesiones": 4,
                            "descripcion": "asdas",
                            "tipoCuracion": "Herida Mayor segunda sesion"
                        }
                    ],
                    "secreciones": [
                        {
                            "nasal": false,
                            "idCita": null,
                            "tipoSonda": "Adulto",
                            "traqueostomia": true,
                            "envioAspirador": true,
                            "tipoPrestacion": "Secrecion",
                            "diasTratamiento": 20,
                            "visitaEnfermeria": true
                        }
                    ],
                    "fototerapias": [],
                    "tomaMuestras": [],
                    "canalizaciones": [
                        {
                            "idCita": null,
                            "tipoPrestacion": "Canalizacion",
                            "tipoCanalizacion": "Intravenosa"
                        }
                    ],
                    "soporteNutricionales": [
                        {
                            "tipo": "Enteral",
                            "noPBS": false,
                            "volumen": 88,
                            "duracion": 60,
                            "descripcion": "S.O.G",
                            "medicamento": {
                                "nombre": "NUTREN 1.0",
                                "presentacion": "500 ML SOLUCION",
                                "idMedicamento": "54421",
                                "codigoMedicamento": "190199"
                            },
                            "unidadDosis": "Bolsas",
                            "cantidadDosis": 1,
                            "tipoPrestacion": "Sondaje"
                        }
                    ]
                },
                "fechaProgramada": "2023-09-15 12:30"
            }
        ]
    }
]


export const remisiones: Remision[] = [
    {
        "idRemision": "8dfg465f4g08",
        "estado": "EGRESADO",
        "numeroIdentificacionPaciente": "1542551515",
        "paciente": "Carlos Fuentes",
        "fechaAdmision": new Date("2023-07-07"),
        "programa": "Agudos",
        "regional": "Barranquilla",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA"
    },
    {
        "idRemision": "777777",
        "estado": "ADMITIDO",
        "numeroIdentificacionPaciente": "717171",
        "paciente": "Pablo Andres Granados Castilla",
        "fechaAdmision": new Date("2023-07-07"),
        "programa": "Agudos",
        "regional": "Barranquilla",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA"
    },
    {
        "idRemision": "36gwqa55",
        "estado": "ADMITIDO",
        "numeroIdentificacionPaciente": "852134679655",
        "paciente": "ABELARDO CARDONA",
        "fechaAdmision": new Date("2023-07-07"),
        "programa": "Agudos",
        "regional": "Barranquilla",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA"
    },
    {
        "idRemision": "5sd4f5ds5dfs45",
        "estado": "ADMITIDO",
        "numeroIdentificacionPaciente": "154545454",
        "paciente": "MIAH  ARISMENDI HERRERA",
        "fechaAdmision": new Date("2023-07-07"),
        "programa": "Agudos",
        "regional": "Barranquilla",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA"
    },
    {
        "idRemision": "74hjg45",
        "estado": "ADMITIDO",
        "numeroIdentificacionPaciente": "14528746825",
        "paciente": "MARIANA VILLA GARCIA",
        "fechaAdmision": new Date("2023-07-07"),
        "programa": "Agudos",
        "regional": "Barranquilla",
        "tipoAdmision": "Domiciliario",
        "institucionRemite": "SALUD EN CASA BARRANQUILLA"
    }
]