import { Cita, EstadosCita } from "src/app/agenda/interfaces/remision.interface";
import { EstadoCita } from "src/app/shared/interfaces/maestros.interfaces";

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