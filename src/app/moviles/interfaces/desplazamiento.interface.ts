export interface Desplazamiento {
    idCitaPartida:                   string;
    idCitaDestino:                   string;
    id_movil:                        string;
    id_profesional:                  string;
    idHorarioTurno:                  number;
    tipo:                            string;
    duracion:                        number;
    idEstado:                        number;
    fechaProgramada:                 Date;
    holgura:                         number;
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
