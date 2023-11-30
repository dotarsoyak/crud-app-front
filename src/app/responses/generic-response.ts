import { DataMensajeModel } from "./model/data-mensaje-model";
import { MetaStatusModel } from "./model/meta-status-model";

export interface GenericResponse{
    Meta: MetaStatusModel;
    Data: DataMensajeModel;
}