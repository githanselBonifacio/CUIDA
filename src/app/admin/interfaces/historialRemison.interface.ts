export interface HistorialRemision {
    
    idRemision:             string;
    estado:                 string;
    fechaAplicacionNovedad: Date;
    motivoNovedad:          string;
    fechaAdmision:          Date;
    programa:               string;
    tipoAdmision:           string;
    institucionRemite:      string;
    paciente:               Paciente;
    ubicacionPaciente:      UbicacionPaciente;
    datosAtencion:          DatosAtencion;
    diagnosticos:           Diagnostico[];
    citas:                  Cita[];
}

export interface Cita {
    datos_cita:     DatosCita;
    tratamientos:   Tratamiento[];
    procedimientos: Procedimientos;
}

export interface DatosCita {
    holgura:          number;
    id_cita:          string;
    latitud:          number;
    duracion:         number;
    longitud:         number;
    id_ciudad:        string;
    id_estado:        string;
    id_remision:      string;
    especialidad:     string;
    fecha_inicio:     Date;
    id_conductor:     string|null;
    id_profesional:   string|null;
    fecha_programada: Date;
}

export interface Procedimientos {
    sondajes:             Sondaje[];
    curaciones:           Curacion[];
    secreciones:          Secrecion[];
    fototerapias:         Fototerapia[];
    canalizaciones:       Canalizacion[];
    toma_muestra:          TomaMuestra[];
    soporte_nutricionales: SoporteNutricional[];
}

export interface Canalizacion {
    id_cita:           string;
    id_canalizacion:   number;
    tipo_prestacion:   string;
    tipo_canalizacion: string;
}

export interface Curacion {
    id_cita:       string;
    sesiones:      number;
    descripcion:   string;
    id_curacion:   number;
    tipo_curacion: string;
}

export interface Fototerapia {
    id_cita:          string;
    cantidad_dosis:   number;
    id_fototerapia:   number;
    tipo_frecuencia:  string;
    tipo_prestacion:  string;
    dias_tratamiento: number;
}

export interface Secrecion {
    nasal:             boolean;
    id_cita:           string;
    tipo_sonda:        string;
    id_secrecion:      number;
    traqueostomia:     boolean;
    envio_aspirador:   boolean;
    tipo_prestacion:   string;
    dias_tratamiento:  number;
    visita_enfermeria: boolean;
}

export interface Sondaje {
    id_cita:         string;
    sondaje:         string;
    id_sondaje:      number;
    tipo_sondaje:    string;
    total_sesiones:  number;
    tipo_prestacion: string;
}

export interface SoporteNutricional {
    tipo:                     string;
    no_pbs:                   boolean;
    id_cita:                  string;
    volumen:                  number;
    duracion:                 number;
    notificado:               boolean;
    descripcion:              string;
    unidad_dosis:             string;
    cantidad_dosis:           number;
    id_medicamento:           string;
    tipo_prestacion:          string;
    codigo_medicamento:       string;
    nombre_medicamento:       string;
    id_soporte_nutricional:   number;
    presentacion_medicamento: string;
}

export interface TomaMuestra {
    id_cita:         string;
    tipo_muestra:    string;
    requiere_ayuno:  boolean;
    id_toma_muestra: number;
    tipo_prestacion: string;
}

export interface Tratamiento {
    no_pbs:                   boolean;
    id_cita:                  string;
    duracion:                 number;
    frecuencia:               string;
    notificado:               boolean;
    unidad_dosis:             string;
    cantidad_dosis:           number;
    id_medicamento:           string;
    id_tratamiento:           number;
    tipo_prestacion:          string;
    tipo_tratamiento:         string;
    codigo_medicamento:       string;
    nombre_medicamento:       string;
    via_administracion:       string;
    presentacion_medicamento: string;
}

export interface DatosAtencion {
    id_remision:        string;
    nombre_cuidador:    string;
    celular_paciente:   string;
    celular_paciente2:  string;
    id_datos_atencion:  number;
    telefono_paciente:  string;
    nombre_responsable: string;
}

export interface Diagnostico {
    id_remision:        string;
    id_diagnostico:     number;
    nombre_diagnostico: string;
}

export interface Paciente {
    edad:                  string;
    peso:                  string;
    sexo:                  string;
    nombres:               string;
    apellidos:             string;
    id_ubicacion:          string;
    tipo_afiliacion:       string;
    fecha_nacimiento:      Date;
    nombre_aseguradora:    string;
    tipo_identificacion:   string;
    numero_identificacion: string;
}

export interface UbicacionPaciente {
    barrio:           string;
    latitud:          number;
    numero1:          string;
    numero2:          string;
    longitud:         number;
    tipo_via:         string;
    direccion:        string;
    id_ciudad:        string;
    municipio:        string;
    id_ubicacion:     string;
    nro_interseccion: string;
    sin_nomenclatura: boolean;
}