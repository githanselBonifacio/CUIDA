export interface Actividad {
    responsable:           string;
    numeroIdentificacion:  string;
    idMovil:               string|null;
    tareas:                Tarea[];
}

export interface Tarea {
    id:               string;
    fechaInicio:      string;
    fechaProgramada:  string;
    duracion:         number;
    holgura:          number;
    latitud:          number;
    longitud:         number;
    estado:           string;
    tipo:             string;
}

export class ConvertActividad {
    public static toActividad(json: string): Actividad[] {
        return JSON.parse(json);
    }

    public static actividadToJson(value: Actividad[]): string {
        return JSON.stringify(value);
    }
}