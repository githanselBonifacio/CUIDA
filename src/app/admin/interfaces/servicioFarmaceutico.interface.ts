
export interface NotificacionFarmacia {
    idTratamiento:                number|null;
    idSoporteNutricional:         number|null;
    numeroIdentificacion:         string;
    tipoIdentificacion:           string;
    nombre:                       string;
    apellido:                     string;

    idMedicamento:                string;
    nombreMedicamento:            string;
    presentacionMedicamento:      string;
    codigoMedicamento:            string;
    cantidadDosis:                string;
    unidadDosis:                  string;
    viaAdministracion:            string;
    frecuencia:                   string;
    duracion:                     number;
    noPBS:                        boolean;

    volumen:                      number|null;
    tipo:                         string;

    notificado:                   boolean;
    fechaProgramada:              Date
}


