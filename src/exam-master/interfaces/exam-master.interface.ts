export interface ExamMasterInterface {
    id: number;
    name: string;
    description?: string; 
    duration?: number;
    status: number;
    creation_date: Date;
    update_date: Date;
  }