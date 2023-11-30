import { PolizaDetalleRequest } from "./poliza-detalle-request";

export interface PolizaRequest{
    idEmpleado:string;
    empleadoGenero:string;
    detalle: PolizaDetalleRequest[];
}