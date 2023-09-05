import { Paciente, Ubicacion, DatosAtencionRemision, Sondaje, TomaMuestra, Fototerapia, Canalizacion, Curacion, Secrecion } from '../../agenda/interfaces/remision.interface';

export interface HistorialRemision {

    idRemision: string;
    estado: string;
    fechaAplicacionNovedad: Date;
    motivoNovedad: string;
    fechaAdmision: Date;
    programa: string;
    tipoAdmision: string;
    institucionRemite: string;
    paciente: Paciente;
    ubicacionPaciente: Ubicacion;
    datosAtencion: DatosAtencionRemision;
    diagnosticos: Diagnostico[];
    citas: Cita[];
    cambioDatosPaciente: boolean;
    cambioDatosAtencion: boolean;

}

export interface Cita {
    datosCita: DatosCita;
    tratamientos: Tratamiento[];
    procedimientos: Procedimientos;
}

export interface DatosCita {
    holgura: number;
    idCita: string;
    latitud: number;
    duracion: number;
    longitud: number;
    idCiudad: string;
    idEstado: string;
    idRemision: string;
    especialidad: string;
    fechaInicio: Date;
    idConductor: string | null;
    idProfesional: string | null;
    fechaProgramada: Date;
}

export interface Procedimientos {
    sondajes: Sondaje[];
    curaciones: Curacion[];
    secreciones: Secrecion[];
    fototerapias: Fototerapia[];
    canalizaciones: Canalizacion[];
    tomaMuestra: TomaMuestra[];
    soporteNutricionales: SoporteNutricional[];
}


export interface Tratamiento {
    noPbs: boolean;
    idCita: string;
    duracion: number;
    frecuencia: string;
    notificado: boolean;
    unidadDosis: string;
    cantidadDosis: number;
    idMedicamento: string;
    idTratamiento: number;
    tipoPrestacion: string;
    tipoTratamiento: string;
    codigoMedicamento: string;
    nombreMedicamento: string;
    viaAdministracion: string;
    presentacionMedicamento: string;
}


export interface Diagnostico {
    idRemision: string;
    idDiagnostico: number;
    nombreDiagnostico: string;
}

export interface SoporteNutricional {
    tipo: string;
    noPbs: boolean;
    idCita: string;
    volumen: number;
    duracion: number;
    notificado: boolean;
    descripcion: string;
    unidadDosis: string;
    cantidadDosis: number;
    idMedicamento: string;
    tipoPrestacion: string;
    codigoMedicamento: string;
    nombreMedicamento: string;
    idSoporteNutricional: number;
    presentacionMedicamento: string;
}

