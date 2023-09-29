
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
    horaFin: Date
}

export interface TipoIdentificacion {
    id: number,
    idTipo: string,
    nombre: string
}
export interface Profesion {
    idProfesion: number,
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
export function formatoFecha(date: Date | string): string {

    const dateTime = new Date(date);
    const day = (dateTime.getDate()).toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear().toString();
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
}

export interface EstadoCita {
    id: string,
    nombre: string,
}

export function getNombreEstadoCitaById(id: string, list: EstadoCita[]): string | undefined {
    const item = list.find(item => item.id == id);
    return item?.nombre;
}

export function getNombreRegionalById(id: string, list: Regional[]): string | undefined {
    const item = list.find(item => item.id == id);
    return item?.nombre;
}

export function getNombreTipoIdentificacionById(id: number, list: TipoIdentificacion[]): string | undefined {
    const item = list.find(item => item.id == id);
    return item?.nombre;
}
export function getIdTipoIdentificacionById(id: number, list: TipoIdentificacion[]): string | undefined {
    const item = list.find(item => item.id == id);
    return item?.idTipo;
}
export function getNombreProfesionById(id: number, list: Profesion[]): string | undefined {
    const item = list.find(item => item.idProfesion == id);
    return item?.nombre;
}