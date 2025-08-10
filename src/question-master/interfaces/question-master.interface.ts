interface OptionMasterInterface {
  id: number;
  optionText: string;
  isCorrect: boolean | number;
  points: number;
}

interface CategoryInterface {
  id: number;
  name: string;
  description: string;
  status: number;
  creationDate: string;
  updateDate: string;
}

export interface QuestionMasterInterface {
  id: number;
  statement: string;
  questionType: number;
  score: number;
  status: number;
  creationDate: string;
  updateDate: string;
  theoryHelps: string;
  refCode: string;
  category: CategoryInterface;
  options: OptionMasterInterface[];
}
