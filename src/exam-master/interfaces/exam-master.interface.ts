export interface ExamMasterInterface {
  id: number;
  name: string;
  description?: string;
  duration?: number;
  status: number;
  min_score: number;
  creation_date: Date;
  update_date: Date;
}
