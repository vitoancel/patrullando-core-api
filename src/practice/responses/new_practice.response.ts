import { BaseResponse } from "src/utils/response";
import { PracticeEntity } from "../entities/practice.entity";

export class CreatePracticeResponse extends BaseResponse<PracticeEntity[]> {}