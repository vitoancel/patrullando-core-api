interface OptionInterface {
    id: number;
    optionText: string;
    isCorrect: boolean;
    isMarked: boolean;
    points: number;
    orderNum: number;
}

interface CategoryInterface {
    id: number;
    name: string;
    description: string;
    status: number;
    creationDate: string;
    updateDate: string;
}

export interface QuestionInterface {
    id: number;
    statement: string;
    questionType: number;
    score: number | null;
    status: number;
    creationDate: string;
    updateDate: string;
    orderNum: number;
    theoryHelps: string;
    refCode: string;
    category: CategoryInterface;
    options: OptionInterface[];
}
