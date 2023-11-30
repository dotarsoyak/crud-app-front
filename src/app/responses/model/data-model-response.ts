import { DetalleArticuloModelResponse } from "./detalle-articulo-model-response";
import { EmpleadoModelResponse } from "./empleado-model-response";
import { PolizaModelResponse } from "./poliza-model-response";

export interface DataModelResponse{
    Poliza: PolizaModelResponse;
    Empleado: EmpleadoModelResponse;
    DetalleArticulo: DetalleArticuloModelResponse[];
}