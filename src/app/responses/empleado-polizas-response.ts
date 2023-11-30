import { MetaStatusModel } from "./model/meta-status-model";

interface PolizaEmpleadoResponseData{
    idPoliza:string;
    cantidad:string;
    fecha:string;
};

interface PolizaResponseDataList{
    Poliza: PolizaEmpleadoResponseData[];
}

export interface EmpleadoPolizasResponse{
    Meta: MetaStatusModel;
    Data: PolizaResponseDataList;
}

