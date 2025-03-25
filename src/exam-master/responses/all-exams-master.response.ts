import { BaseResponse } from "src/utils/response";
import { ExamMasterEntity } from "../entities/exam-master.entity";

export class AllExamsMasterResponse extends BaseResponse<ExamMasterEntity[]> {}