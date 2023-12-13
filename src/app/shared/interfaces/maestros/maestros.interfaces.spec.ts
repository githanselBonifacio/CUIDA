import { EstadosCita } from "src/app/shared/interfaces/agenda/estadosCita.interface";
import { formatoFecha, formatoFechaHora, formatoHora, funtionGetColorReferenciaTurnoById, funtionGetIdTipoIdentificacionById, funtionGetNombreEstadoCitaById, funtionGetNombreProfesionById, funtionGetNombreRegionalById, funtionGetNombreTipoIdentificacionById, generarHorario } from "./maestros.interfaces";
import { estadosCitaTest } from "src/assets/files/test/citas";
import { horarioTurnoTest, profesionesTest, regionalesTest, tipoIdentificacionTest } from "src/assets/files/test/maestros";

describe('MaestroInterfaz', () => {

    it("validar formato de fecha", () => {

        const fechaDate = new Date("2023-08-08 06:00");

        expect(formatoHora(fechaDate)).toEqual("06:00");
        expect(formatoFecha(fechaDate)).toEqual("2023-08-08");
        expect(formatoFechaHora(fechaDate)).toEqual("2023-08-08 06:00");

    })

    it("generar horario", () => {
        const horarioT1 = generarHorario(1);
        const horarioT2 = generarHorario(2);
        const horarioT3 = generarHorario(3);

        expect(horarioT1).toEqual(['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'])
        expect(horarioT2).toEqual(['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', "22:00"])
        expect(horarioT3).toEqual(['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'])
    })

    it('get nombre de estado', () => {
        const estado = funtionGetNombreEstadoCitaById(estadosCitaTest[0].id, estadosCitaTest);
        expect(estado).toEqual(estadosCitaTest[0].nombre)
    })

    it('get nombre de regional', () => {
        const regionales = funtionGetNombreRegionalById(regionalesTest[0].id, regionalesTest);
        expect(regionales).toEqual(regionalesTest[0].nombre)
    })

    it('get nombre de identificacion', () => {
        const nombreIdentificacion = funtionGetNombreTipoIdentificacionById(tipoIdentificacionTest[0].id, tipoIdentificacionTest);
        expect(nombreIdentificacion).toEqual(tipoIdentificacionTest[0].nombre)
    })

    it('get tipo de identificacion', () => {
        const tipoIdentificacion = funtionGetIdTipoIdentificacionById(tipoIdentificacionTest[0].id, tipoIdentificacionTest);
        expect(tipoIdentificacion).toEqual(tipoIdentificacionTest[0].idTipo)
    })

    it('get nombre profesion', () => {
        const nombreProfesion = funtionGetNombreProfesionById(profesionesTest[0].idProfesion, profesionesTest);
        expect(nombreProfesion).toEqual(profesionesTest[0].nombre)
    })

    it('get color referencia turno', () => {
        const colorReferencia = funtionGetColorReferenciaTurnoById(horarioTurnoTest[0].id, horarioTurnoTest);
        expect(colorReferencia).toEqual(horarioTurnoTest[0].colorHexReferencia)
    })
});