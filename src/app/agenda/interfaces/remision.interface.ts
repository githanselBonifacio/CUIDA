export interface Cita {
    idCita: string;
    idRemision: string;
    duracion: number;
    holgura: number;
    fechaInicio: Date;
    fechaProgramada: Date;
    especialidad: string;
    latitud: number;
    longitud: number;
    idRegional: string;
    idEstado: number;
    idProfesional: string | null;
    idConductor: string | null;
    paciente: string;
    tipoIdentificacionPaciente: string;
    numeroIdentificacionPaciente: string;

}
export enum EstadosCita {
    sinAgendar = 1,
    agendada = 2,
    confirmada = 3,
    enProgreso = 4,
    cancelada = 5,
    finalizada = 6
}

export interface Medicamento {
    idMedicamento: string;
    nombre: string;
    presentacion: string;
    codigoMedicamento: string;
}

export interface Tratamiento {
    tipoTratamiento: string;
    cantidadDosis: string;
    medicamento: Medicamento;
    unidadDosis: string;
    viaAdministracion: string;
    frecuencia: string;
    duracion: number;
    noPBS: boolean;
    tipoPrestacion: string;
}
export interface Procedimientos {
    curaciones: Curacion[];
    fototerapias: Fototerapia[];
    sondajes: Sondaje[];
    secreciones: Secrecion[];
    tomaMuestras: TomaMuestra[];
    soporteNutricionales: SoporteNutricional[];
    canalizaciones: Canalizacion[];
}
export interface Curacion {
    tipoCuracion: string;
    descripcion: string;
    sesiones: number;
}
export interface Sondaje {
    tipoSondaje: string;
    tipoSonda: string;
    totalSesiones: number;
    tipoPrestacion: string;
}

export interface TomaMuestra {
    tipoMuestra: string;
    requiereAyuno: boolean;
    tipoPrestacion: string;
}

export interface SoporteNutricional {
    medicamento: Medicamento;
    cantidadDosis: number;
    unidadDosis: string;
    tipo: string;
    descripcion: string;
    duracion: number;
    volumen: number;
    noPBS: string;
    tipoPrestacion: string;


}
export interface Fototerapia {
    diasTratamiento: number;
    tipoFrecuencia: string;
    cantidadDosis: string;
    tipoPrestacion: string;
}

export interface Canalizacion {
    tipoCanalizacion: string;
    tipoPrestacion: string;
}

export interface Secrecion {
    diasTratamiento: number;
    envioAspirador: boolean;
    visitaEnfermeria: boolean;
    tipoSonda: string;
    nasal: boolean;
    traqueostomia: boolean;
    tipoPrestacion: string;

}
export interface Ubicacion {
    latitud: number;
    longitud: number;
    direccion: string;
    tipoVia: string;
    numero1: string;
    numero2: string;
    barrio: string;
    sinNomenclatura: boolean;
    nroInterseccion: string;
    municipio: string;

}
export interface DatosAtencionRemision {
    nombreCuidador: string;
    nombreResponsable: string;
    telefonoPaciente: string;
    celularPaciente: string;
    celularPaciente2: string;
}

export interface Paciente {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    edad: number;
    sexo: string;
    peso: number;
    tipoAfiliacion: string;
    nombreAseguradora: string;
    fechaNacimiento: Date;
    ubicacion: Ubicacion;
}


export class Convert {
    public static toTurno(json: string): Cita {
        return JSON.parse(json);
    }

    public static TurnoToJson(value: Cita): string {
        return JSON.stringify(value);
    }
}
