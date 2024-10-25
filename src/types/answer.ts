// Answer doesn't need "id" as there should not be two same answers
export type Answer = {
    title: string;
    isCorrect: boolean;
    description?: string;
}