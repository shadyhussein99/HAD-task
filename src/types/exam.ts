 import type { Question } from "./question";
 
 export type Exam = {
    id: number;
    title: string;
    questions: Question[];
    description?: string;
}