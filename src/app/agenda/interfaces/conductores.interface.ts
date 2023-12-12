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
    activo: boolean;

}

export interface Movil {
    matricula: string;
    marca: string;
    modelo: Date;
    idRegional: string;
    activo: boolean;

}