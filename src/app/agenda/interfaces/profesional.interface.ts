export interface Profesional {
    idTipoIdentificacion: number;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    idRegional: string;
    activo: boolean;

}

export class Convert {
    public static toProfesional(json: string): Profesional {
        return JSON.parse(json);
    }

    public static ProfesionalJson(value: Profesional): string {
        return JSON.stringify(value);
    }
}