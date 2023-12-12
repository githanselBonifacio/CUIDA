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
    citas: CitaHitorial[];
    citasNuevas: CitaHitorial[];
    cambioDatosPaciente: boolean;
    cambioDatosAtencion: boolean;

}

export interface CitaHitorial {
    idCita: string;
    latitud: number;
    duracion: number;
    holgura: number;
    longitud: number;
    idRegional: string;
    idEstado: number;
    idRemision: string;
    especialidad: string;
    fechaInicio: Date;
    idConductor: string | null;
    idProfesional: string | null;
    fechaProgramada: Date;
    tratamientos: TratamientoHistorial[];
    procedimientos: ProcedimientosHistorial;
}

export interface ProcedimientosHistorial {
    sondajes: Sondaje[];
    curaciones: Curacion[];
    secreciones: Secrecion[];
    fototerapias: Fototerapia[];
    canalizaciones: Canalizacion[];
    tomaMuestras: TomaMuestra[];
    soporteNutricionales: SoporteNutricional[];
}


export interface TratamientoHistorial {
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
    cantidadDosis: string;
    idMedicamento: string;
    tipoPrestacion: string;
    codigoMedicamento: string;
    nombreMedicamento: string;
    idSoporteNutricional: number;
    presentacionMedicamento: string;
}

