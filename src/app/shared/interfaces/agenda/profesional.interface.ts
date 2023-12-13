import { HorarioTurno } from "src/app/shared/interfaces/maestros/maestros.interfaces";

export interface Profesional {
    idTipoIdentificacion: number;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    email: string
    telefono: string | null;
    celular: string;
    direccion: string;
    genero: string;
    idProfesion: number;
    fechaNacimiento: string;
    idRegional: string;
    activo: boolean;
}
export interface ProfesionalConTurnos extends Profesional {
    turnos: Turno[];
}
export interface Turno {
    idTurno: number | null,
    fechaTurno: Date | string | null,
    idHorarioTurno: any | HorarioTurno,
    idProfesional: string,
    idRegional: string
}
export interface Secuencia {
    nombre: string;
    descripcion: string;
    itemsDiaTurno: ItemDiaTurno[];
}
export interface ItemDiaTurno {
    numeroDia: number;
    nombreDia: string;
    horariosTurno: HorarioTurno[];
}

export interface TurnoProfesional {
    fechaTurno: Date | string;
    idHorarioTurno: number;
    idProfesional: string;
    idRegional: string;
}


export class ConvertMaestros {
    public static toProfesional(json: string): Profesional {
        return JSON.parse(json);
    }

    public static ProfesionalJson(value: Profesional): string {
        return JSON.stringify(value);
    }

    public static toTurno(json: string): Turno {
        return JSON.parse(json);
    }
}