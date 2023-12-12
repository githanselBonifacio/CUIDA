import { Actividad } from "src/app/diagramas/interfaces/tarea-gantt.interface";

export const horas = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
export const actividadesTest: Actividad[] = [
    {
        "responsable": "Alicia Paola Rodriguez Campos",
        "numeroIdentificacion": "145854565",
        "idMovil": null,
        "tareas": [
            {
                "id": "8d4asdff54f_2",
                "fechaInicio": "2023-07-08 06:00",
                "fechaProgramada": "2023-07-08 06:00",
                "duracion": 3600,
                "holgura": 3600,
                "latitud": 11.004831,
                "longitud": -74.816292,
                "idEstado": 2,
                "tipo": "VISITA"
            },
            {
                "id": "8dasddsaf54f_2",
                "fechaInicio": "2023-07-08 10:00",
                "fechaProgramada": "2023-07-08 10:00",
                "duracion": 3600,
                "holgura": 3600,
                "latitud": 11.004831,
                "longitud": -74.816292,
                "idEstado": 2,
                "tipo": "VISITA"
            },

            {
                "id": "8d66f54f_2",
                "fechaInicio": "2023-07-08 14:00",
                "fechaProgramada": "2023-07-08 14:00",
                "duracion": 3600,
                "holgura": 3600,
                "latitud": 11.004831,
                "longitud": -74.816292,
                "idEstado": 2,
                "tipo": "VISITA"
            },
        ]
    }
]