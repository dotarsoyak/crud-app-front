import { MetaStatusModel } from "./model/meta-status-model";

interface DataEmpleado{
    idEmpleado:string;
    nombre:string;
    apellido:string;
};

interface DataEmpleadoList{
    Empleado: DataEmpleado[];
}

export interface EmpleadoListResponse{
    Meta: MetaStatusModel;
    Data: DataEmpleadoList;
}

