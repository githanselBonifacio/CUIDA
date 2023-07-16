export interface Actividad {
    numero_identificacion:               string;
    id_movil:                            string|null;
    responsable:                         string;
    Clasificacion_habilidad_responsable: string|null;
    tareas:                              Tarea[];
}

export interface Tarea {
    id_cita:              string;
    fecha_inicio:         string;
    fecha_programada:     string;
    duracion_seg:         number;
    holgura_seg:          number;
    latitud:              number|any;
    longitud:             number|any;
    estado:               string;
    tipo:                 string;
    conductor:            string|null;
    identificacion_movil_tarea: string|null;
}

export class ConvertActividad {
    public static toActividad(json: string): Actividad[] {
        return JSON.parse(json);
    }

    public static actividadToJson(value: Actividad[]): string {
        return JSON.stringify(value);
    }
}