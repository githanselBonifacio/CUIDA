import { Profesion } from "src/app/shared/interfaces/maestros/maestros.interfaces"

export const regionalesTest = [
    {
        "id": "4292",
        "nombre": "Medellín",
        "latitud": 6.228581,
        "longitud": -75.573997,
        "direccion": "CL 26 # 45 - 106, Medellín, Antioquia"
    },
    {
        "id": "834",
        "nombre": "Cali",
        "latitud": 3.42423427,
        "longitud": -76.5448105,
        "direccion": "Carrera 38 A # 5 A - 22"
    },
]

export const horarioTurnoTest = [
    {
        "id": 1,
        "nombre": "T1",
        "horaInicio": new Date("06:00:00"),
        "horaFin": new Date("13:59:00"),
        "colorHexReferencia": "#7FD9E1",
        "esHorarioBase": true,
        "descripcion": "mañana",
        "duracionHoras": 8
    },

]
export const horarioTurnoTest2 = [

    {
        "id": 2,
        "nombre": "T2",
        "horaInicio": new Date("14:00:00"),
        "horaFin": new Date("21:59:00"),
        "colorHexReferencia": "#FADBA5",
        "esHorarioBase": true,
        "descripcion": "tarde",
        "duracionHoras": 8
    },
]
export const horarioTurnoTestDescanso = [
    {
        "id": 4,
        "nombre": "D",
        "horaInicio": new Date("06:00:00"),
        "horaFin": new Date("05:59:00"),
        "colorHexReferencia": "#FADBA5",
        "esHorarioBase": true,
        "descripcion": "tarde",
        "duracionHoras": 0
    },
]

export const tipoIdentificacionTest = [

    {
        "id": 7,
        "idTipo": "CC",
        "nombre": "Cédula de ciudadanía",
        "esMayorEdad": true
    },
    {
        "id": 8,
        "idTipo": "CE",
        "nombre": "Cédula de extranjería",
        "esMayorEdad": true
    },
    {
        "id": 9,
        "idTipo": "RC",
        "nombre": "Registro Civil",
        "esMayorEdad": false
    }

]

export const profesionesTest: Profesion[] = [
    {
        "idProfesion": 1,
        "nombre": "Auxiliar de enfermería"
    },
    {
        "idProfesion": 3,
        "nombre": "Médico General"
    },
    {
        "idProfesion": 4,
        "nombre": "Médico especialista"
    },
]