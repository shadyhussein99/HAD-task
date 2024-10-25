 import type { Question } from "./question";
 
 // "id" has type of number to facilitate generating unique ids
 export type Exam = {
    id: number;
    title: string;
    questions: Question[];
    description?: string;
}