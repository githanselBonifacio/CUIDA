import { Conductor } from "src/app/shared/interfaces/agenda/conductores.interface";
import { Profesional, ProfesionalConTurnos } from "src/app/shared/interfaces/agenda/profesional.interface";
import { Movil } from "src/app/shared/interfaces/agenda/conductores.interface";
import { Dia } from "src/app/shared/interfaces/maestros/maestros.interfaces";

export const diasFebrero: Dia[] = [
    { numero: "01", nombre: "Mié" },
    { numero: '02', nombre: 'Jue' },
    { numero: '03', nombre: 'Vie' },
    { numero: '04', nombre: 'Sáb' },
    { numero: '05', nombre: 'Dom' },
    { numero: '06', nombre: 'Lun' },
    { numero: '07', nombre: 'Mar' },
    { numero: '08', nombre: 'Mié' },
    { numero: '09', nombre: 'Jue' },
    { numero: '10', nombre: 'Vie' },
    { numero: '11', nombre: 'Sáb' },
    { numero: '12', nombre: 'Dom' },
    { numero: '13', nombre: 'Lun' },
    { numero: '14', nombre: 'Mar' },
    { numero: '15', nombre: 'Mié' },
    { numero: '16', nombre: 'Jue' },
    { numero: '17', nombre: 'Vie' },
    { numero: '18', nombre: 'Sáb' },
    { numero: '19', nombre: 'Dom' },
    { numero: '20', nombre: 'Lun' },
    { numero: '21', nombre: 'Mar' },
    { numero: '22', nombre: 'Mié' },
    { numero: '23', nombre: 'Jue' },
    { numero: '24', nombre: 'Vie' },
    { numero: '25', nombre: 'Sáb' },
    { numero: '26', nombre: 'Dom' },
    { numero: '27', nombre: 'Lun' },
    { numero: '28', nombre: 'Mar' }
]

export const profesionalesDataTest: ProfesionalConTurnos[] = [
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "1248946452",
        "nombres": "Alicia Paula",
        "apellidos": "Rodriguez",
        "email": "prueba@sura.com.co",
        "telefono": null,
        "celular": "300254896",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1996-05-05",
        "idRegional": "427",
        "activo": false,
        "turnos": [
            {
                "idTurno": 1,
                "fechaTurno": "2023-10-02",
                "idHorarioTurno": 1,
                "idProfesional": "1248946452",
                "idRegional": "427"
            },
            {
                "idTurno": 2,
                "fechaTurno": "2023-10-05",
                "idHorarioTurno": 1,
                "idProfesional": "1248946452",
                "idRegional": "427"
            }
        ]
    },
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "96325454",
        "nombres": "Beatriz Andrea",
        "apellidos": "Benjarano Marquez",
        "email": "prueba@sura.com.co",
        "telefono": "3018654",
        "celular": "3002548900",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1999-05-05",
        "idRegional": "427",
        "activo": true,
        "turnos": [
            {
                "idTurno": 3,
                "fechaTurno": "2023-10-04",
                "idHorarioTurno": 4,
                "idProfesional": "96325454",
                "idRegional": "427"
            },
            {
                "idTurno": 4,
                "fechaTurno": "2023-10-05",
                "idHorarioTurno": 1,
                "idProfesional": "96325454",
                "idRegional": "427"
            },

        ]
    },
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "963252874",
        "nombres": "Camila Paola",
        "apellidos": "Gonzalez Cala",
        "email": "prueba@sura.com.co",
        "telefono": null,
        "celular": "300254896",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1996-08-09",
        "idRegional": "427",
        "activo": true,
        "turnos": []
    }
]
export const profesionalesDataTest2: Profesional[] = [
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "1248946452",
        "nombres": "Alicia Paula",
        "apellidos": "Rodriguez",
        "email": "prueba@sura.com.co",
        "telefono": null,
        "celular": "300254896",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1996-05-05",
        "idRegional": "427",
        "activo": false,

    },
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "96325454",
        "nombres": "Beatriz Andrea",
        "apellidos": "Benjarano Marquez",
        "email": "prueba@sura.com.co",
        "telefono": "3018654",
        "celular": "3002548900",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1999-05-05",
        "idRegional": "427",
        "activo": true,

    },
    {
        "idTipoIdentificacion": 1,
        "numeroIdentificacion": "963252874",
        "nombres": "Camila Paola",
        "apellidos": "Gonzalez Cala",
        "email": "prueba@sura.com.co",
        "telefono": null,
        "celular": "300254896",
        "direccion": "direccion XX prueba",
        "genero": "Femenino",
        "idProfesion": 1,
        "fechaNacimiento": "1996-08-09",
        "idRegional": "427",
        "activo": true,

    }
]

export const conductoresDataTest: Conductor[] = [
    {
        "idTipoIdentificacion": 7,
        "numeroIdentificacion": "2545465465",
        "nombres": "Brian",
        "apellidos": "o'conell",
        "email": "bo@sura.com.co",
        "telefono": "",
        "celular": "3009654840",
        "direccion": "Calle 89#20-65",
        "genero": "Masculino",
        "fechaNacimiento": "1975-09-24",
        "idRegional": "427",
        "activo": true
    },
    {
        "idTipoIdentificacion": 7,
        "numeroIdentificacion": "148332151",
        "nombres": "Carlos Daniel",
        "apellidos": "Camargo Rodriguez",
        "email": "efd@sura.com.co",
        "telefono": "3058954",
        "celular": "3009875652",
        "direccion": "Calle 96#65-98",
        "genero": "Masculino",
        "fechaNacimiento": "1997-02-09",
        "idRegional": "586",
        "activo": true
    }
]

export const movilesTest: Movil[] = [
    {
        "matricula": "fds-454",
        "idRegional": "4292",
        "marca": "Mazda",
        "modelo": new Date("2012-01-01"),
        "activo": true
    },
    {
        "matricula": "dfg-455",
        "idRegional": "586",
        "marca": "Mazda",
        "modelo": new Date("2021-02-17"),
        "activo": true
    },
]