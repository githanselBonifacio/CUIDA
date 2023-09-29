export interface Conductor {
    idTipoIdentificacion: number;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    email: string
    telefono: string | null;
    celular: string;
    direccion: string;
    genero: string;
    fechaNacimiento: string;
    idRegional: string;
    movil: Movil;
    activo: boolean;

}

export interface Movil {
    matriculaMovil: string;
    numeroIdentificacionConductor: string;
    idRegional: string;
    activo: boolean;

}