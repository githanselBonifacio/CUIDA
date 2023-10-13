import { HorarioTurno } from "src/app/shared/interfaces/maestros.interfaces";

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
    fechaTurno: Date,
    idHorarioTurno: any | HorarioTurno,
    idProfesional: string,
    idRegional: string
}

export class ConvertTurno {
    public static toTurno(json: string): Turno {
        return JSON.parse(json);
    }
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