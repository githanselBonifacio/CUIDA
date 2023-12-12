
export interface NotificacionFarmacia {
    idRemision: string;
    idTratamiento: number | null;
    idSoporteNutricional: number | null;
    numeroIdentificacion: string;
    tipoIdentificacion: string;
    nombres: string;
    apellidos: string;

    idMedicamento: string;
    nombreMedicamento: string;
    presentacionMedicamento: string;
    codigoMedicamento: string;
    cantidadDosis: number;
    unidadDosis: string;
    viaAdministracion: string;
    frecuencia: string;
    duracion: number;
    noPBS: boolean;

    volumen: number | null;
    tipo: string;

    notificado: boolean;
    fechaProgramada: Date
}


