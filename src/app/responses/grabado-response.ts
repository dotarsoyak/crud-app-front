import { MetaStatusModel } from "./model/meta-status-model";
import { DataModelResponse } from "./model/data-model-response";

export interface GrabadoResponse{
    Meta: MetaStatusModel;
    Data: DataModelResponse;
}