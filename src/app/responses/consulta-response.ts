import { MetaStatusResponse } from "./model/meta-status-model";
import { DataModelResponse } from "./model/data-model-response";

export interface ConsultaResponse{
    Meta: MetaStatusResponse;
    Data: DataModelResponse;
}