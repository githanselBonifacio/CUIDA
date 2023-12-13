import { Paciente, Ubicacion, DatosAtencionRemision, Procedimientos, Tratamiento, Diagnostico } from '../agenda/remision.interface';

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
    tratamientos: Tratamiento[];
    procedimientos: Procedimientos;
}



