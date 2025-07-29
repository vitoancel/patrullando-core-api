export interface ExamInterface {
  id: number;
  startDate: string;
  endDate: string | null;
  duration: number;
  status: number;
  creationDate: string;
  updateDate: string;
  userId: number;
  score: number;
  min_score: number;
  pendingQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
}
