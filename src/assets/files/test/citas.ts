import { CitaHitorial } from "src/app/shared/interfaces/admin/historialRemison.interface";
import { Cita, EstadosCita } from "src/app/shared/interfaces/agenda/remision.interface";
import { EstadoCita } from "src/app/shared/interfaces/maestros/maestros.interfaces";

export const citasTest: Cita[] = [
    {
        idCita: "a8sd52d_4",
        idRemision: "a8sd52d",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 1,
        idProfesional: null,
        idConductor: null,
        paciente: "paciente no agendado",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "1235941"
    },
    {
        idCita: "asd4654asd6_4",
        idRemision: "asd4654asd6_4",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 2,
        idProfesional: "1294515",
        idConductor: null,
        paciente: "paciente agendado",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "864254196"
    },
    {
        idCita: "dsdfdsf_4",
        idRemision: "dsdfdsf",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 3,
        idProfesional: "2545465456",
        idConductor: null,
        paciente: "paciente confirmado",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "812645"
    },
    {
        idCita: "asd54s64_4",
        idRemision: "asd54s64",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 4,
        idProfesional: "825412",
        idConductor: null,
        paciente: "paciente progreso",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "9645496545"
    },
    {
        idCita: "as74f56a4f_4",
        idRemision: "as74f56a4f",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 5,
        idProfesional: "894546465",
        idConductor: null,
        paciente: "paciente cancelado",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "98745421"
    },
    {
        idCita: "asd4564sd_4",
        idRemision: "asd4564sd",
        duracion: 1200,
        holgura: 900,
        fechaInicio: new Date(),
        fechaProgramada: new Date(),
        especialidad: "especialidad",
        latitud: 11.454564,
        longitud: 9.121651,
        idRegional: "427",
        idHorarioTurno: 1,
        idEstado: 6,
        idProfesional: "98545641652",
        idConductor: null,
        paciente: "paciente finalizado",
        tipoIdentificacionPaciente: "1",
        numeroIdentificacionPaciente: "321421"
    }

]

export const estadosCitaTest: EstadoCita[] = [
    {
        id: EstadosCita.sinAgendar,
        nombre: "Sin agendar"
    },
    {
        id: EstadosCita.agendada,
        nombre: "agendada"
    },
    {
        id: EstadosCita.confirmada,
        nombre: "Confirmada"
    },
    {
        id: EstadosCita.enProgreso,
        nombre: "En progreso"
    },
    {
        id: EstadosCita.cancelada,
        nombre: "Cancelada"
    },
    {
        id: EstadosCita.finalizada,
        nombre: "Finalizada"
    }
]

export const citaHistorialTest: CitaHitorial[] = [
    {
        "idCita": "333333333-9",
        "holgura": 900,
        "latitud": 10.988778,
        "duracion": 2700,
        "idEstado": 1,
        "longitud": -74.814696,
        "idRegional": "427",
        "idRemision": "333333333",
        "fechaInicio": new Date("2023-09-02 12:30"),
        "idConductor": null,
        "especialidad": "Enfermeria",
        "tratamientos": [],
        "idProfesional": null,
        "procedimientos": {
            "sondajes": [],
            "curaciones": [
                {
                    "sesiones": 4,
                    "descripcion": "asdas",
                    "tipoCuracion": "Herida Mayor segunda sesion"
                }
            ],
            "secreciones": [
                {
                    "nasal": false,
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
                    "tipoPrestacion": "Canalizacion",
                    "tipoCanalizacion": "Intravenosa"
                }
            ],
            "soporteNutricionales": [
                {
                    "tipo": "Enteral",
                    "volumen": 88,
                    "duracion": 60,
                    "descripcion": "S.O.G",
                    "medicamento": {
                        "idMedicamento": "54421",
                        "nombre": "NUTREN 1.0",
                        "codigoMedicamento": "190199",
                        "presentacion": "500 ML SOLUCION",
                    },
                    "cantidadDosis": "Bolsas",
                    "unidadDosis": "CC",
                    "noPbs": false,
                    "notificado": false,
                    "tipoPrestacion": "Sondaje"
                }
            ]
        },
        "fechaProgramada": new Date("2023-09-02 12:30")
    },
    {
        "idCita": "333333333-10",
        "holgura": 900,
        "latitud": 10.988778,
        "duracion": 2700,
        "idEstado": 1,
        "longitud": -74.814696,
        "idRegional": "427",
        "idRemision": "333333333",
        "fechaInicio": new Date("2023-09-05 14:00"),
        "idConductor": null,
        "especialidad": "Enfermeria",
        "tratamientos": [
            {

                "duracion": 5,
                "frecuencia": "Mensual",
                "notificado": false,

                "medicamento": {
                    "idMedicamento": "54421",
                    "nombre": "NUTREN 1.0",
                    "codigoMedicamento": "190199",
                    "presentacion": "500 ML SOLUCION",
                },

                "unidadDosis": "mg",
                "cantidadDosis": 200,
                "tipoPrestacion": "AplicacionMedicamentos",
                "tipoTratamiento": "MEDICAMENTOS",
                "viaAdministracion": "I.M.",
                "noPbs": false,
            }
        ],
        "idProfesional": null,
        "procedimientos": {
            "sondajes": [
                {

                    "tipoSonda": "Toma de Muestra",
                    "tipoSondaje": "Sonda Nasogástrica (BK)",
                    "totalSesiones": 1,
                    "tipoPrestacion": "Sondaje"
                }
            ],
            "curaciones": [],
            "secreciones": [],
            "fototerapias": [
                {
                    "cantidadDosis": "2",
                    "tipoFrecuencia": "4x4",
                    "tipoPrestacion": "Fototerapia",
                    "diasTratamiento": 2
                }
            ],
            "tomaMuestras": [
                {
                    "tipoMuestra": "Orina",
                    "requiereAyuno": false,
                    "tipoPrestacion": "TomaMuestra"
                }
            ],
            "canalizaciones": [],
            "soporteNutricionales": [
                {
                    "tipo": "Enteral",
                    "volumen": 88,
                    "duracion": 60,
                    "descripcion": "S.O.G",
                    "medicamento": {
                        "idMedicamento": "54421",
                        "nombre": "NUTREN 1.0",
                        "codigoMedicamento": "190199",
                        "presentacion": "500 ML SOLUCION",
                    },

                    "unidadDosis": "mg",
                    "cantidadDosis": "200",
                    "tipoPrestacion": "Sondaje",
                    "noPbs": false,
                    "notificado": false,
                }
            ]
        },
        "fechaProgramada": new Date("2023-09-05 14:00")
    },
]