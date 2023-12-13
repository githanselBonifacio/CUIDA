import { DatePipe, registerLocaleData } from "@angular/common";
import localeEs from '@angular/common/locales/es';
export interface Regional {
    id: string,
    nombre: string,
    latitud: number,
    longitud: number,
    direccion: string
}


export interface HorarioTurno {
    id: number,
    nombre: string,
    horaInicio: Date,
    horaFin: Date,
    colorHexReferencia: string,
    esHorarioBase: boolean,
    descripcion: string,
    duracionHoras: number
}

export interface TipoIdentificacion {
    id: number,
    idTipo: string,
    nombre: string
    esMayorEdad: boolean;
}
export interface Profesion {
    idProfesion: number,
    nombre: string
}

export interface Dia {
    numero: string,
    nombre: string
}
export function generarHorario(idHorarioTurno: number): string[] {
    let horarioArray: string[] = [];
    if (idHorarioTurno == 1) {
        horarioArray = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
    } else if (idHorarioTurno == 2) {
        horarioArray = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', "22:00"]
    } else {
        horarioArray = ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
    }
    return horarioArray;
}
export function formatoFecha(fecha: Date): string {
    registerLocaleData(localeEs);
    const datePipe = new DatePipe('es');
    return datePipe.transform(fecha, "yyyy-MM-dd")!;
}
export function formatoFechaMes(fecha: Date): string {
    registerLocaleData(localeEs);
    const datePipe = new DatePipe('es');
    return datePipe.transform(fecha, "yyyy-MM")!;
}
export function formatoFechaHora(fecha: Date): string {
    registerLocaleData(localeEs);
    const datePipe = new DatePipe('es');
    return datePipe.transform(fecha, "yyyy-MM-dd HH:mm")!;
}
export function formatoHora(fecha: Date): string {
    registerLocaleData(localeEs);
    const datePipe = new DatePipe('es');
    return datePipe.transform(fecha, "HH:mm")!;
}
export interface EstadoCita {
    id: number,
    nombre: string,
}

function getNombreEstadoCitaById(id: string | number, list: EstadoCita[]): string | undefined {
    const item = list?.find(item => item.id == id);
    return item?.nombre;
}

function getNombreRegionalById(id: string, list: Regional[]): string | undefined {
    const item = list?.find(item => item.id == id);
    return item?.nombre;
}

function getNombreTipoIdentificacionById(id: number, list: TipoIdentificacion[]): string | undefined {
    const item = list?.find(item => item.id == id);
    return item?.nombre;
}
function getIdTipoIdentificacionById(id: number, list: TipoIdentificacion[]): string | undefined {
    const item = list?.find(item => item.id == id);
    return item?.idTipo;
}
function getNombreProfesionById(id: number, list: Profesion[]): string | undefined {
    const item = list?.find(item => item.idProfesion == id);
    return item?.nombre;
}
function getColorReferenciaTurnoById(id: number | any, list: HorarioTurno[]): string | undefined {
    const item = list?.find(item => item.id == id);
    return item?.colorHexReferencia;
}


export const funtionGetNombreEstadoCitaById = getNombreEstadoCitaById;
export const funtionGetNombreRegionalById = getNombreRegionalById;
export const funtionGetNombreTipoIdentificacionById = getNombreTipoIdentificacionById;
export const funtionGetIdTipoIdentificacionById = getIdTipoIdentificacionById;
export const funtionGetNombreProfesionById = getNombreProfesionById;
export const funtionGetColorReferenciaTurnoById = getColorReferenciaTurnoById;
