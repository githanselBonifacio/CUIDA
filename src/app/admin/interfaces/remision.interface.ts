export interface Remision {
    idRemision: string;
    estado: string;
    numeroIdentificacionPaciente: string;
    paciente: string;
    fechaAdmision: Date;
    programa: string;
    regional: string;
    tipoAdmision: string;
    institucionRemite: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRemision(json: string): Remision {
        return JSON.parse(json);
    }

    public static remisionToJson(value: Remision): string {
        return JSON.stringify(value);
    }
}
