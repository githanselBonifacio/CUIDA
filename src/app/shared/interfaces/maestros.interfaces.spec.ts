import { formatoFecha } from "./maestros.interfaces";

describe('MaestroInterfaz', () => {

    it("validar formato de fecha", () => {
        const fechaString = "2023-07-07";
        const fechaDate = new Date("2023-08-08 06:00");

        // expect(formatoFecha(fechaString)).toEqual("2023-07-07");
        expect(formatoFecha(fechaDate)).toEqual("2023-08-08");
    })
});