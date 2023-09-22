export interface Profesional {

    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    idRegional: string;
    activo: number;

}

export class Convert {
    public static toProfesional(json: string): Profesional {
        return JSON.parse(json);
    }

    public static ProfesionalJson(value: Profesional): string {
        return JSON.stringify(value);
    }
}