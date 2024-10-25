import type { Answer } from "./answer"


// "id" has type of number to facilitate generating unique ids
export type Question = {
    id: number;
title: string;
answers: Answer[];
description?: string;
}