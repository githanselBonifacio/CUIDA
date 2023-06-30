export interface Turno {
    id_turno:                number;
    fecha_turno:             Date;
    id_horario_turno:        number;
    id_cita:                 string;
    id_remision:             string;
    fecha_inicio:            string;
    duracion_seg:            number;
    holgura_seg:             number;
    latitud:                 number;
    longitud:                number;
    id_regional:             number;
    clasificacion_habilidad: string;
    estado:                  string;
    id_profesional:          string;
    id_movil:                string;
    fecha_programada:        string;
    descripcion:             string;
}

export class Convert {
    public static toTurno(json: string): Turno {
        return JSON.parse(json);
    }

    public static TurnoToJson(value: Turno): string {
        return JSON.stringify(value);
    }
}
