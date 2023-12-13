export interface Respuesta {
    status: number;
    flag: boolean;
    message: string;
    tecnicalMessage: string;
    detail: string;
    result: any;
}