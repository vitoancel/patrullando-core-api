import { BaseResponse } from "src/utils/response";
import { ExamEntity } from "../entities/exam.entity";

export class AllExamsResponse extends BaseResponse<ExamEntity[]> {}