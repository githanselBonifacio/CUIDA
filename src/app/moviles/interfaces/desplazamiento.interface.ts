export interface Desplazamiento {
    id_cita_partida:                 string;
    id_cita_destino:                 string;
    id_movil:                        string;
    id_profesional:                  string;
    fecha_inicio_desplazamiento:     Date;
    duracion_seg:                    number;
    id_estado:                       number;
    fecha_programada_desplazamiento: Date;
    holgura_seg:                     number;
    matricula:                       string;
    numero_identificacion_conductor: string;
    conductor:                       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDesplazamiento(json: string): Desplazamiento {
        return JSON.parse(json);
    }

    public static desplazamientoToJson(value: Desplazamiento): string {
        return JSON.stringify(value);
    }
}
