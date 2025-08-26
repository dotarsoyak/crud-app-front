import { MetaStatusModel } from "./model/meta-status-model";

export interface DataEmpleado {
    idEmpleado: string;
    nombre: string;
    apellido: string;
};

export interface DataEmpleadoList {
    Empleado: DataEmpleado[];
}

export interface EmpleadoListResponse {
    Meta: MetaStatusModel;
    Data: DataEmpleadoList;
}
