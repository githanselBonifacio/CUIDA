
export interface Regional{
    id:number,
    nombre:string
}

export interface HorarioTurno{
    id:number,
    hora_inicio:Date,
    hora_fin:Date
}
export function crearHorario():HorarioTurno{
    return {
        id:1,
        hora_inicio:new Date(),
        hora_fin:new Date()
    }
}
export function generarHorario(idHorarioTurno: number): string[] {
    let horarioArray: string[] = [];
    if ( idHorarioTurno == 1){
        horarioArray = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00']
    } else if (idHorarioTurno == 2){
        horarioArray = ['14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00',"22:00"]
    }else{
        horarioArray = ['22:00','23:00','00:00','01:00','02:00','03:00','04:00','05:00','06:00']
    }
    return horarioArray;
  }