import type { Answer } from "./answer"

export type Question = {
id: number;
title: string;
answers: Answer[];
description?: string;
}