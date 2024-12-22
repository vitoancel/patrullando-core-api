import { BaseResponse } from "src/utils/response";
import { PlanEntity } from "../entities/plan.entity";

export class AllPlansResponse extends BaseResponse<PlanEntity[]> {}