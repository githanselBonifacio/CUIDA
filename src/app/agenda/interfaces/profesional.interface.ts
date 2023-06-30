export interface Profesional {
    numero_identificacion: string;
    primer_nombre:         string;
    segundo_nombre:        string;
    primer_apellido:       string;
    segundo_apellido:      string;
    id_habilidad:          number;
    id_regional:           number;
}

export class Convert {
    public static toProfesional(json: string): Profesional {
        return JSON.parse(json);
    }

    public static ProfesionalJson(value: Profesional): string {
        return JSON.stringify(value);
    }
}